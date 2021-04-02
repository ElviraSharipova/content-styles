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
  Checkbox
} from '@material-ui/core';
import axios from "axios";
import Cookies from 'js-cookie';

import { tests12 as tests } from "./tests";

export default function Test(props) {
  const classes = useStyles();
  const [checkpoints, setCheckpoints] = useState("");
  //const [tests, setTests] = useState([]);
  const [value, setValue] = useState(new Array(tests.length).fill(' '));
  const [error, setError] = useState(new Array(tests.length).fill(false));
  const [helperText, setHelperText] = useState(new Array(tests.length).fill(' '));
  const [, updateComponent] = useState();

  //useEffect(() => {
  //  const ref_token = localStorage.getItem("token_ref");
  //  axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
  //    const token = res.data.access;
  //    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //    axios.get("/content/components/" + props.testId + "/").then(res => {
  //      setTests(JSON.parse(res.data.props));
  //      setCheckpoints(res.data.checkpoints);
  //      console.log(res.data);
  //    })
  //  })
  //}, []);

  //const handleChange = (event) => {
  //  event.persist();
  //  for (let index = 0; index < tests.length; index++) {
  //    if (event.target.name === tests[index].name) {
  //      setValue(c => changeByIndex(c, index, event.target.value));
  //      setHelperText(c => changeByIndex(c, index, ' '));
  //      setError(c => changeByIndex(c, index, false));
  //    }
  //  }
  //};

  //const handleSubmit = (event) => {
  //  event.preventDefault();
  //  var answers = new Array(tests.length);
  //  for (let index = 0; index < tests.length; index++) {
  //    answers[index] = { checkpoint: checkpoints[index].id, key: value[index] }
  //  }
  //  const user_id = localStorage.getItem("user");
  //  axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
  //  axios.put("/content/progress/" + user_id + "/check/", { answers: answers }).then(res => {
  //    console.log(res.data);
  //    var results = new Array(tests.length);
  //    for (let index = 0; index < tests.length; index++) {
  //      results[index] = !res.data.passed_checkpoints[index].passed;
  //    }
  //    setHelperText(results);
  //    setError(results);
  //  }).catch(err => console.error(err));
  //};

  function changeByIndex(object, index, value) {
    object[index] = value;
    return [...object]
  }

  const handleSubmitMock = (event) => {
    event.preventDefault();
  };

  const handleChangeMock = (event) => {
    event.persist();
    for (let index = 0; index < tests.length; index++) {
      if (event.target.name === tests[index].name) {
        setValue(c => changeByIndex(c, index, event.target.value));
        setHelperText(c => changeByIndex(c, index, ' '));
        setError(c => changeByIndex(c, index, false));
      }
    }
  };

  return (
    <form onSubmit={handleSubmitMock} className={classes.test}>
      {tests.map(e => (
        <div>
          <span>
          <FormControl component="fieldset" error={error[tests.indexOf(e)]}>
            <FormLabel component="legend" style={{ color: "black", fontWeight: "bold" }}>{tests.indexOf(e) + 1}{".  "}{e.question}</FormLabel>
              {e.type == "Выбрать ответ(ы)" &&
              <>
              {/*<RadioGroup className={classes.testButtons} aria-label="quiz" name={e.name} value={value[tests.indexOf(e)] || ""} onChange={handleChange}>
                  {
                    e.variants.map(c => (
                      <FormControlLabel value={c.value} control={<Radio color="primary" />} label={c.label} />
                    ))
                  }
                </RadioGroup>*/}
                <FormGroup className={classes.testButtons} name={e.name}>
                  {
                    e.variants.map(c => (
                      <FormControlLabel control={<Checkbox color="primary" checked={true} onChange={handleChangeMock} />} label={c.label} />
                    ))
                  }
                </FormGroup>
                </>
              }
              {
                e.type == "Развернутый ответ" &&
                <TextField id="standard-basic" label="Ответ" name={e.name} value={value[tests.indexOf(e)] || ""} onChange={handleChangeMock}/>
              }
              <FormHelperText style={{ marginBottom: 64 }}>{error[tests.indexOf(e)] ? ("Не верно"): ("Верно")}</FormHelperText>
          </FormControl>
          </span>
          <span style={{ marginLeft: 100 }}>({checkpoints != "" ? (checkpoints[tests.indexOf(e)].score) : ("")} балл)</span>
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </form>
  );
}
