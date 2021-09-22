import React from "react";

import useStyles from "./styles";
import {
  Button,
  TextField,
  Collapse,
  Typography,
} from "@material-ui/core";


export default function JsonEditor(props) {
  const [data, setData] = React.useState(props.data);
  const [newName, setNewName] = React.useState(null);
  const [newValue, setNewValue] = React.useState(null);
  const [open, setOpen] = React.useState({});

  function handleOpen(index) {
    open[index] = !open[index];
    setOpen({ ...open });
  };

  function updateData(keys, value) {
    console.log(data)
    var obj = data
    for (let index = 0; index < keys.length - 1; index++) {
      var obj = obj[keys[index]]
    }
    if (typeof (obj[keys[keys.length - 1]]) == "undefined") {
      if (value == "[]") {
        obj[keys[keys.length - 1]] = []
      } else if (value == "{}") {
        obj[keys[keys.length - 1]] = {}
      } else {
        obj[keys[keys.length - 1]] = value
      }
    } else {
      obj[keys[keys.length - 1]] = value
    }
    setData({ ...data })
  }

  function deleteData(keys) {
    var obj = data
    for (let index = 0; index < keys.length - 1; index++) {
      var obj = obj[keys[index]]
    }
    if (Array.isArray(obj)) {
      obj = [...obj.slice(0, keys[keys.length - 1]), ...obj.slice(keys[keys.length - 1] + 1)]
    }
    delete obj[keys[keys.length - 1]]
    setData({ ...data })
  }

  function objectCreator(parent_keys = []) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: 800 }}>
        <TextField
          variant="outlined"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          type="email"
          helperText="New preset name"
          fullWidth
          style={{ margin: 12 }}
        />
        <TextField
          variant="outlined"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          type="email"
          helperText="New preset value"
          fullWidth
          multiline
          style={{ margin: 12 }}
        />
        <Button
          onClick={() => { parent_keys.push(newName); updateData(parent_keys, newValue) }}
          variant="outlined"
          color="primary"
          size="large"
          style={{ width: 150, height: 50, marginTop: 12 }}
        >
          Добавить элемент
         </Button>
      </div>
    )
  }

  function objectEditor(key, value, parent_keys = []) {
    let keys = [...parent_keys]
    keys.push(key)
    if (typeof (value) == "string" || typeof (value) == "number") {
      return (
        <div style={{ display: "flex", justifyContent: "center", width: 800 }}>
          <TextField
            variant="outlined"
            value={value}
            onChange={e => updateData(keys, e.target.value)}
            placeholder={key}
            type="email"
            helperText={key}
            fullWidth
            multiline
            style={{ margin: 12 }}
          />
          <Button
            onClick={() => deleteData(keys)}
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: 150, height: 50 }}
          >
            Удалить элемент
          </Button>
        </div>
      )
    } else if (Array.isArray(value)) {
      var open_key = JSON.stringify(keys)
      return (<>
        <div style={{ margin: 12, display: "flex" }}>
          <Button variant="outlined" onClick={() => handleOpen(open_key)} style={{ textTransform: "initial", cursor: "pointer" }}>{key}</Button>
          <Button
            onClick={() => deleteData(keys)}
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: 150, height: 50 }}
          >
            Удалить элемент
          </Button>
        </div>
        <Collapse in={false || open[open_key]} timeout="auto" unmountOnExit style={{ marginLeft: 24 }}>
        {value.map(c => (
          objectEditor(value.indexOf(c), c, keys)
        ))}
        {objectCreator(keys)}
        </Collapse>
      </>)
    } else {
      var open_key = JSON.stringify(keys)
      return (<>
        <div style={{ margin: 12, display: "flex" }}>
          <Button variant="outlined" onClick={() => handleOpen(open_key)} style={{ textTransform: "initial", cursor: "pointer" }}>{key}</Button>
          <Button
            onClick={() => deleteData(keys)}
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: 150, height: 50 }}
          >
            Удалить элемент
          </Button>
        </div>
        <Collapse in={false || open[open_key]} timeout="auto" unmountOnExit style={{ marginLeft: 24 }}>
        {Object.entries(value).map(c => (
          objectEditor(c[0], c[1], keys)
        ))}
          {objectCreator(keys)}
        </Collapse>
      </>)
    }
  }

  return (<>
    <hr />
    {Object.entries(data).map(c => (
      objectEditor(c[0], c[1])
    ))}
    {objectCreator()}
  </>);
}
