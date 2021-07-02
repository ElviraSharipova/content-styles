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

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';


export default function Test(props) {
  const classes = useStyles();
  const [checkpoints, setCheckpoints] = useState("");
  const [tests, setTests] = useState([]);
  const [value, setValue] = useState(new Array(tests.length).fill({}));
  const [results, setResults] = useState(new Array(tests.length).fill(null));
  const [score, setScore] = useState(new Array(tests.length).fill(0));
  const [helperText, setHelperText] = useState(' ');
  const [showHeader, setShowHeader] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [minScore, setMinScore] = useState(0);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var answer;

  function restartTest() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.id + "/").then(res => {
        let scoreCounter = 0
        for (let index = 0; index < res.data.checkpoints.length; index++) {
          scoreCounter += res.data.checkpoints[index].score
        }
        setMinScore(res.data.min_score)
        setTotalScore(scoreCounter)
        setCheckpoints(res.data.checkpoints);
        setTests(JSON.parse(res.data.props));
        setValue(new Array(tests.length).fill({}));
        setResults(new Array(tests.length).fill(null));
        setScore(new Array(tests.length).fill(0));
        setShowHeader(false)
        setHelperText(' ')
      })
    })
  }

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.id + "/").then(res => {
        let scoreCounter = 0
        for (let index = 0; index < res.data.checkpoints.length; index++) {
          scoreCounter += res.data.checkpoints[index].score
        }
        setMinScore(res.data.min_score)
        setTotalScore(scoreCounter)
        setCheckpoints(res.data.checkpoints);
        setTests(JSON.parse(res.data.props));
        setValue(new Array(tests.length).fill({}));
        setResults(new Array(tests.length).fill(null));
        setScore(new Array(tests.length).fill(0));
        setShowHeader(false)
        setHelperText(' ')
      })
    })
  }, [props.id]);

  function parceFeedback(feedback) {
    var res = {}
    var index
    for (var item in feedback) {
      index = parseInt(item.split(",").pop()) - 1
      if (typeof (res[index]) == "undefined") {
        res[index] = true
      }
      res[index] = feedback[item] && res[index]
    }
    return res
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var answers = new Array();
    for (let index = 0; index < tests.length; index++) {
      if (value[index]) {
        if (tests[index].type == "choice") {
          answer = new Array()
          for (var item in value[index]) {
            if (value[index][item]) {
              answer.push(item)
            }
          }
          answer = JSON.stringify(answer)
        }
        if (tests[index].type == "matrix") {
          answer = new Array()
          var checked = new Array(tests[index].variants_y.length).fill(false)
          for (var item in value[index]) {
            if (value[index][item]) {
              answer.push(item)
              checked[parseInt(item.split(",").pop()) - 1] = true
            }
          }
          for (let index = 0; index < checked.length; index++) {
            if (!checked[index]) {
              answer.push(`0,${index + 1}`)
            }
          }
          answer = JSON.stringify(answer)
        }
        if (tests[index].type == "detailed") {
          answer = value[index][tests[index].name]
        }
        answers.push({ checkpoint: checkpoints[index].id, key: answer })
      }
    }
    console.log(answers)
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const progressId = localStorage.getItem("progressId");
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.put("/content/progress/" + progressId + "/check/", { answers: JSON.stringify(answers), component: props.id }).then(res => {
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
        setShowHeader(true)
        props.contentWindow.current.scrollTo(0, 0)
      }).catch(err => console.error(err));
    })
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
      {showHeader && score.reduce(reducer, 0) >= minScore &&
        <div className={classes.testHeader} style={{ backgroundColor: "#a0ff9e" }}>
          <div>
            <div style={{ display: "flex" }}>
              <CheckIcon style={{ marginRight: 6, color: "green" }} />
              <Typography variant="h4">Поздравляем! Вы прошли тест!</Typography>
            </div>
            <Typography variant="body1" style={{ marginLeft: 30, marginTop: 12 }}>Ваша оценка: {score.reduce(reducer, 0)}/{totalScore}</Typography>
          </div>
          <Button style={{ margin: 24 }} variant="contained" color="primary" onClick={restartTest}>Пройти заново</Button>
        </div>
      }
      {showHeader && score.reduce(reducer, 0) < minScore &&
        <div className={classes.testHeader} style={{ backgroundColor: "#ff9197" }}>
          <div>
            <div style={{ display: "flex" }}>
              <ClearIcon style={{ marginRight: 6, color: "red" }} />
              <Typography variant="h4">Попробуйте ещё раз</Typography>
            </div>
            <Typography variant="body1" style={{ marginLeft: 30, marginTop: 12 }}>Ваша оценка: {score.reduce(reducer, 0)}/{totalScore}</Typography>
          </div>
          <Button style={{ margin: 24 }} variant="contained" color="primary" onClick={restartTest}>Пройти заново</Button>
        </div>
      }
      {tests.map(e => (
        <div style={{ width: 800 }}>
          <FormControl component="fieldset" style={{ marginTop: 48 }}>
            <FormLabel component="legend" style={{ color: "black", maxWidth: 800, lineHeight: 1.3 }}>
              {tests.indexOf(e) + 1}{".  "}{e.question}{" "}{(checkpoints != "" && checkpoints[tests.indexOf(e)]) ? (stringifyScore(score[tests.indexOf(e)], checkpoints[tests.indexOf(e)].score)) : ("")}
            </FormLabel>
            <div style={{ marginLeft: 20 }}>
              <img src={e.image} style={{ marginTop: 24, marginBottom: 12, maxWidth: 1280, maxHeight: 480 }} />
              {e.type == "choice" &&
                <FormGroup className={classes.testButtons} style={{ maxWidth: 800 }}>
                  {
                    e.variants.map(c => (
                      <FormControlLabel
                        className={classes.testCheckbox}
                        classes={{ label: classes.testCheckboxLabel }}
                        control={<Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][c.value] : false} onChange={handleChangeChoice} value={c.value} name={e.name} />}
                        label={c.label}
                        style={results[tests.indexOf(e)] != null && typeof (results[tests.indexOf(e)][e.variants.indexOf(c)]) != "undefined" ? {
                          backgroundColor: results[tests.indexOf(e)][e.variants.indexOf(c)] ? "#A6FFA6" : "#FFA6A6"
                        } : {}}
                      />
                    ))
                  }
                </FormGroup>
              }
              {e.type == "matrix" &&
                <TableContainer component={Paper} style={{ flexGrow: 1, marginBottom: 48, maxWidth: 1280 }}>
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
                            <TableCell align="center">
                              <Checkbox
                                color="primary"
                                checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][c.value + "," + r.value] : false}
                                onChange={handleChangeChoice}
                                value={c.value + "," + r.value}
                                name={e.name}
                              />
                            </TableCell>
                          ))}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
              {
                e.type == "detailed" &&
                <TextField
                  id="standard-basic"
                  style={results[tests.indexOf(e)] != null ? { backgroundColor: results[tests.indexOf(e)][1] ? "#A6FFA6" : "#FFA6A6", marginBottom: 24 } : { marginBottom: 24 }}
                  label="Ответ"
                  name={e.name}
                  value={value[tests.indexOf(e)] ? value[tests.indexOf(e)][e.name] : ""}
                  onChange={handleChangeDetailed}
                />
              }
              {
                e.type == "enumerate" &&
                <TextField
                  id="standard-basic"
                  style={results[tests.indexOf(e)] != null ? { backgroundColor: results[tests.indexOf(e)][1] ? "#A6FFA6" : "#FFA6A6", marginBottom: 24 } : { marginBottom: 24 }}
                  label="Ответ"
                  name={e.name}
                  value={value[tests.indexOf(e)] ? value[tests.indexOf(e)][e.name] : ""}
                  onChange={handleChangeDetailed}
                />
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
