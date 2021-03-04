import React, { useState } from "react";
import useStyles from "./styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Button
} from '@material-ui/core';

export default function Test(props) {
  const tests = props.tests;
  const classes = useStyles();
  const [value, setValue] = useState(new Array(tests.length).fill(' '));
  const [error, setError] = useState(new Array(tests.length).fill(false));
  const [helperText, setHelperText] = useState(new Array(tests.length).fill(' '));
  const [, updateComponent] = useState();

  const handleRadioChange = (event) => {
    for (let index = 0; index < tests.length; index++) {
      if (event.target.name === tests[index].name) {
        setValue(c => changeByIndex(c, index, event.target.value));
        setHelperText(c => changeByIndex(c, index, ' '));
        setError(c => changeByIndex(c, index, false));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let index = 0; index < tests.length; index++) {
      if (value[index] === tests[index].answer) {
        setHelperText(c => changeByIndex(c, index, 'Верно'));
        setError(c => changeByIndex(c, index, false));
      } else {
        setHelperText(c => changeByIndex(c, index, 'Не верно'));
        setError(c => changeByIndex(c, index, true));
      }
    }
  };

  function changeByIndex(object, index, value) {
    object[index] = value;
    return [...object]
  }

  return (
    <form onSubmit={handleSubmit} className={classes.test}>
      {tests.map(e => (
        <div>
          <FormControl component="fieldset" error={error[tests.indexOf(e)]}>
            <FormLabel component="legend">{ e.question }</FormLabel>
            <RadioGroup aria-label="quiz" name={e.name} value={value[tests.indexOf(e)]} onChange={handleRadioChange}>
              {
                e.variants.map(c => (
                  <FormControlLabel value={c.value} control={<Radio />} label={c.label} />
                  ))
              }
            </RadioGroup>
            <FormHelperText>{helperText[tests.indexOf(e)]}</FormHelperText>
          </FormControl>
        </div>
      ))}
      <Button type="submit" variant="outlined" color="primary">
        Подтвердить
        </Button>
    </form>
  );
}
