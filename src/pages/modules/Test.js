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
  Typography
} from '@material-ui/core';
import axios from "axios";
import Cookies from 'js-cookie';

//import { tests12 as tests } from "./tests";

export default function Test(props) {
  const classes = useStyles();
  const [checkpoints, setCheckpoints] = useState("");
  const [tests, setTests] = useState([]);
  const [value, setValue] = useState(new Array(tests.length).fill({}));
  const [passed, setPassed] = useState(new Array(tests.length).fill(false));
  const [score, setScore] = useState(new Array(tests.length).fill(0));
  const [helperText, setHelperText] = useState(new Array(tests.length).fill(' '));
  const [, updateComponent] = useState();

  var answer;

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.testId + "/").then(res => {
        console.log(res.data.checkpoints);
        setTests(JSON.parse(res.data.props));
        setCheckpoints(res.data.checkpoints);
      })
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    var answers = new Array();
    for (let index = 0; index < tests.length; index++) {
      if (value[index]) {
        if (tests[index].type == "choice" || tests[index].type == "matrix") {
          answer = ""
          for (var item in value[index]) {
            if (value[index][item]) {
              answer += item + "__"
            }
          }
          answer = answer.slice(0, -2)
        }
        if (tests[index].type == "detailed") {
          answer = value[index][tests[index].name]
        }
        answers.push({ checkpoint: checkpoints[index].id, key: answer })
      }
    }
    console.log(answers);
    const user_id = localStorage.getItem("user");
    axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
    axios.put("/content/progress/" + props.progressId + "/check/", { answers: JSON.stringify(answers), component: props.testId }).then(res => {
      console.log(res.data);
      var scores = new Array(tests.length).fill(0);
      var results = new Array(tests.length);
      for (let index = 0; index < tests.length; index++) {
        for (let response_index = 0; response_index < res.data.passed_checkpoints.length; response_index++) {
          if (checkpoints[index].id == res.data.passed_checkpoints[response_index].checkpoint) {
            scores[index] = res.data.passed_checkpoints[response_index].score;
            if (scores[index] == checkpoints[index].score) {
              results[index] = true;
            }
          }
        }
      }
      setScore(scores);
      //setHelperText(results);
      setPassed(results);
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
        setHelperText(c => changeByIndex(c, index, ' '));
        setPassed(c => changeByIndex(c, index, false));
      }
    }
  };

  const handleChangeDetailed = (event) => {
    event.persist();
    for (let index = 0; index < tests.length; index++) {
      if (event.target.name === tests[index].name) {
        setValue(c => changeByIndex(c, index, { [event.target.name]: event.target.value }));
        setHelperText(c => changeByIndex(c, index, ' '));
        setPassed(c => changeByIndex(c, index, false));
      }
    }
  };

  function stringifyScore(score, maxScore) {
    if (!score || score < 0) return `(Баллы 0/${maxScore})`
    return `(Баллы ${score}/${maxScore})`
  }

  //REMOVE AFTER TEST REUPLOAD!!!
  function tempIndexConverter(index) {
    return (Number.parseInt(index) + 1).toString()
  }

  return (
    <form onSubmit={handleSubmit} className={classes.test}>
      {tests.map(e => (
        <div style={{ width: 1280 }}>
          <FormControl component="fieldset" error={!passed[tests.indexOf(e)]}>
            <FormLabel component="legend" style={{ color: passed[tests.indexOf(e)] ? "green" : "black", fontWeight: "bold" }}>{tests.indexOf(e) + 1}{".  "}{e.question}{" "}{checkpoints != "" ? (stringifyScore(score[tests.indexOf(e)], checkpoints[tests.indexOf(e)].score)) : ("")}</FormLabel>
              {e.type == "choice" &&
                <FormGroup className={classes.testButtons}>
                  {
                    e.variants.map(c => (
                      <FormControlLabel control={<Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][tempIndexConverter(c.value)] : false} onChange={handleChangeChoice} value={tempIndexConverter(c.value)} name={e.name} />} label={c.label} />
                    ))
                  }
                </FormGroup>
              }
              {e.type == "matrix" &&
                <div style={{ flexGrow: 1, marginTop: 24 }}>
                  <Grid container spacing={1} alignItems="center">
                  {e.variants_y.map(r => (
                    <Grid container item xs={12} spacing={3} alignItems="flex-end">
                      <Grid item xs={3}>
                        <Typography variant="body2">{r.label}</Typography>
                      </Grid>
                      {e.variants_x.map(c => (
                        <Grid item xs={1}>
                          {r.value == 0 && <Typography variant="body2">{c.label}</Typography>}
                          <Checkbox color="primary" checked={value[tests.indexOf(e)] ? value[tests.indexOf(e)][tempIndexConverter(r.value) + "," + tempIndexConverter(c.value)] : false} onChange={handleChangeChoice} value={tempIndexConverter(r.value) + "," + tempIndexConverter(c.value)} name={e.name} />
                        </Grid>
                      ))}
                      </Grid>
                  ))}
                  </Grid>
                </div>
              }
              {
                e.type == "detailed" &&
                <TextField id="standard-basic" label="Ответ" name={e.name} value={value[tests.indexOf(e)] ? value[tests.indexOf(e)][e.name] : ""} onChange={handleChangeDetailed}/>
              }
            <FormHelperText style={{ marginBottom: 64 }}>{helperText[tests.indexOf(e)]}</FormHelperText>
          </FormControl>
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </form>
  );
}
