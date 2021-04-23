import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  TextField,
  FormGroup,
  Checkbox,
  Grid,
  Typography,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
  makeStyles
} from '@material-ui/core';
import axios from "axios";
import Cookies from 'js-cookie';
import Widget from "../../components/Widget";

//import { tests12 as tests } from "./tests";

export default function Test(props) {
  const classes = useStyles();
  const [checkpoints, setCheckpoints] = useState("");
  const [tests, setTests] = useState([]);
  const [value, setValue] = useState(new Array(tests.length).fill({}));
  const [results, setResults] = useState(new Array(tests.length).fill(null));
  const [score, setScore] = useState(new Array(tests.length).fill(0));
  const [helperText, setHelperText] = useState(' ');
  const [, updateComponent] = useState();

  var answer;

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.id + "/").then(res => {
        console.log(res.data.checkpoints);
        setTests(JSON.parse(res.data.props));
        setCheckpoints(res.data.checkpoints);
      })
    })
  }, []);

  function parceFeedback(feedback) {
    var res = {}
    var index
    for (var item in feedback) {
      index = parseInt(item.slice(-1)) - 1
      if (typeof (res[index]) == "undefined") {
        res[index] = true
      }
      res[index] = feedback[item] && res[index]
    }
    console.log(res)
    return res
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var answers = new Array();
    for (let index = 0; index < tests.length; index++) {
      if (value[index]) {
        if (tests[index].type == "choice" || tests[index].type == "matrix") {
          answer = new Array()
          for (var item in value[index]) {
            if (value[index][item]) {
              answer.push(item)
            }
          }
          console.log(answer)
          answer = JSON.stringify(answer)
        }
        if (tests[index].type == "detailed") {
          answer = value[index][tests[index].name]
        }
        answers.push({ checkpoint: checkpoints[index].id, key: answer })
      }
    }
    console.log(answers);
    const progressId = localStorage.getItem("progressId");
    axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
    axios.put("/content/progress/" + progressId + "/check/", { answers: JSON.stringify(answers), component: props.id }).then(res => {
      console.log(res.data);
      var scores = new Array(tests.length).fill(0);
      var feedback = new Array(tests.length);
      var answers = JSON.parse(res.data.answers);
      for (let index = 0; index < tests.length; index++) {
        for (let response_index = 0; response_index < res.data.passed_checkpoints.length; response_index++) {
          if (checkpoints[index].id == res.data.passed_checkpoints[response_index].checkpoint) {
            scores[index] = res.data.passed_checkpoints[response_index].score;
          }
        }
      }
      for (let index = 0; index < tests.length; index++) {
        for (let response_index = 0; response_index < answers.length; response_index++) {
          if (checkpoints[index].id == answers[response_index].checkpoint) {
            feedback[index] = parceFeedback(answers[response_index].feedback)
          }
        }
      }
      setScore(scores);
      setHelperText("Ответы отправлены");
      setResults(feedback);
      //window.scroll({
      //  top: 0,
      //  left: 0,
      //  behavior: 'smooth',
      //});
    }).catch(err => console.error(err));
  };

  function changeByIndex(object, index, value) {
    object[index] = value;
    return [...object]
  }

  const handleChangeChoice = (event) => {
    event.persist();
    for (let index = 0; index < tests.length; index++) {
      if (event.target.name === tests[index].name) {
        setValue(c => changeByIndex(c, index, { ...c[index], [event.target.value]: event.target.checked }));
        setHelperText(' ');
        setResults(c => changeByIndex(c, index, null));
      }
    }
  };

  const handleChangeDetailed = (event) => {
    event.persist();
    for (let index = 0; index < tests.length; index++) {
      if (event.target.name === tests[index].name) {
        setValue(c => changeByIndex(c, index, { [event.target.name]: event.target.value }));
        setHelperText(' ');
        setResults(c => changeByIndex(c, index, null));
      }
    }
  };

  function stringifyScore(score, maxScore) {
    if (!score || score < 0) return `(Баллы 0/${maxScore})`
    return `(Баллы ${score}/${maxScore})`
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <form onSubmit={handleSubmit} className={classes.test}>
      <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 24 }}>
        {props.title}
      </Typography>
      {tests.map(e => (
        <div style={{ width: 1280 }}>
          <FormControl component="fieldset" style={{ marginTop: 48 }}>
            <FormLabel component="legend">{tests.indexOf(e) + 1}{".  "}{e.question}{" "}{checkpoints != "" ? (stringifyScore(score[tests.indexOf(e)], checkpoints[tests.indexOf(e)].score)) : ("")}</FormLabel>
            <div style={{ marginLeft: 20 }}>
              <img src={e.image} style={{ marginTop: 24, marginBottom: 12 }} />
              {e.type == "choice" &&
                <FormGroup className={classes.testButtons}>
                  {
                    e.variants.map(c => (
                      <FormControlLabel control={<Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][c.value] : false} onChange={handleChangeChoice} value={c.value} name={e.name} />} label={c.label} />
                    ))
                  }
                </FormGroup>
              }
              {e.type == "matrix" &&
              <TableContainer component={Paper} style={{ flexGrow: 1, marginBottom: 48 }}>
                {/*<Widget style={{ flexGrow: 1, marginTop: 24, marginBottom: 48 }}>
                  <Grid container spacing={1} alignItems="center">
                    {e.variants_x.map(r => (
                      <Grid container item xs={12} spacing={3} alignItems="flex-end">
                        <Grid item xs={2}>
                          <Typography variant="body2">{r.label}</Typography>
                        </Grid>
                        {e.variants_y.map(c => (
                          <Grid item xs={1}>
                            {r.value == 1 && <Typography variant="body2">{c.label}</Typography>}
                            <Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][r.value + "," + c.value] : false} onChange={handleChangeChoice} value={r.value + "," + c.value} name={e.name} />
                          </Grid>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </Widget>*/}
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        {e.variants_x.map(c => (
                          <TableCell align="center">{c.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {e.variants_y.map(r => (
                        <StyledTableRow key={r.label} style={results[tests.indexOf(e)] && { backgroundColor: results[tests.indexOf(e)][e.variants_y.indexOf(r)] ? "#A6FFA6" : "#FFA6A6" }}>
                          <TableCell component="th" scope="row">
                            {r.label}
                          </TableCell>
                          {e.variants_x.map(c => (
                            <TableCell align="center"><Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][c.value + "," + r.value] : false} onChange={handleChangeChoice} value={c.value + "," + r.value} name={e.name} /></TableCell>
                          ))}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
              {
                e.type == "detailed" &&
                <TextField id="standard-basic" style={{ marginBottom: 24 }} label="Ответ" name={e.name} value={value[tests.indexOf(e)] ? value[tests.indexOf(e)][e.name] : ""} onChange={handleChangeDetailed}/>
              }
            </div>
          </FormControl>
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
      <FormHelperText style={{ marginBottom: 64 }}>{helperText}</FormHelperText>
    </form>
  );
}
