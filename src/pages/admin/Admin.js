import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import useStyles from "./styles";
import { Button, TextField, Typography } from "@material-ui/core";
import Header from "../../components/Header/HeaderLanding";

import axios from "axios";
import Cookies from 'js-cookie';

const Admin = props => {
  var classes = useStyles();

  const [courseName, setCourseName] = useState("Нейротехнологии и нейроанатомия");
  const [componentName, setComponentName] = useState("Вводная лекция");
  const [content, setContent] = React.useState({});
  const [exists, setExists] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  function findComponent() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/", {
        params: {
          module__theme__course__title: courseName,
          title: componentName
        }
      }).then(res => {
        if (res.data[0]) {
          console.log(res.data)
          setContent(res.data[0])
          setExists(true)
          setHelperText("")
        } else {
          setHelperText("Does not exist")
        }
      })
    })
  }

  function findModule() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/modules/", {
        params: {
          theme__course__title: courseName,
          title: componentName
        }
      }).then(res => {
        if (res.data[0]) {
          console.log(res.data[0])
          setContent({ module: res.data[0].id })
          setExists(false)
          setHelperText("")
        } else {
          setHelperText("Does not exist")
        }
      })
    })
  }

  function updateComponent() {
    if (exists) {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.put(`/content/components/${content.id}/`, content).then(res => {
          setHelperText("Confirmed")
        }).catch(err => {
          setHelperText("Error")
        })
      })
    } else {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.post(`/content/components/`, content).then(res => {
          setHelperText("Confirmed")
        }).catch(err => {
          setHelperText("Error")
        })
      })
    }
  }

  function deleteComponent() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.delete(`/content/components/${content.id}/`).then(res => {
        setHelperText("Confirmed")
      }).catch(err => {
        setHelperText("Error")
      })
    })
  }

  function updateContent(value, field) {
    if (field == "module") { setExists(false) }
    content[field] = value
    setContent({ ...content })
    setHelperText("")
  }

    return (
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Header history={props.history} />
        <div className={classes.fakeToolbar} />
        <div style={{ display: "flex", justifyContent: "center", width: 1200 }}>
          <TextField
            id="courseName"
            variant="outlined"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
            placeholder="Название курса"
            type="email"
            fullWidth
            style={{ margin: 48 }}
          />
          <TextField
            id="componentName"
            variant="outlined"
            value={componentName}
            onChange={e => setComponentName(e.target.value)}
            placeholder="Название компонента/модуля"
            type="name"
            fullWidth
            style={{ margin: 48 }}
          />
          <div style={{ margin: 48 }}>
            <Button
              onClick={findComponent}
              variant="contained"
              color="primary"
              size="large"
              style={{ width: 150, height: 50, marginBottom: 6 }}
            >
              Найти компонент
            </Button>
            <Button
              onClick={findModule}
              variant="contained"
              color="primary"
              size="large"
              style={{ width: 150, height: 50 }}
            >
              Найти модуль
            </Button>
          </div>
        </div>
        <div style={{ width: 1200, padding: 48 }}>
          <Typography variant="h5" style={{ textAlign: "center", color: "red" }}>
            {helperText}
          </Typography>
          <TextField
            variant="outlined"
            value={content.module}
            onChange={e => updateContent(e.target.value, "module")}
            placeholder="Module"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.index}
            onChange={e => updateContent(e.target.value, "index")}
            placeholder="Index"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.active}
            onChange={e => updateContent(e.target.value, "active")}
            placeholder="Active"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.title}
            onChange={e => updateContent(e.target.value, "title")}
            placeholder="Title"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.description}
            onChange={e => updateContent(e.target.value, "description")}
            placeholder="Description"
            type="email"
            fullWidth
            multiline
          />
          <TextField
            variant="outlined"
            value={content.text}
            onChange={e => updateContent(e.target.value, "text")}
            placeholder="Text"
            type="email"
            fullWidth
            multiline
          />
          <TextField
            variant="outlined"
            value={content.type}
            onChange={e => updateContent(e.target.value, "type")}
            placeholder="Type"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.min_score}
            onChange={e => updateContent(e.target.value, "min_score")}
            placeholder="Min score"
            type="email"
            fullWidth
          />
          <TextField
            variant="outlined"
            value={content.props}
            onChange={e => updateContent(e.target.value, "props")}
            placeholder="Props"
            type="email"
            fullWidth
            multiline
          />
          <Button
            onClick={updateComponent}
            variant="outlined"
            color="primary"
            size="large"
            style={{ width: 150, height: 50 }}
          >
            {exists ? "Обновить" : "Создать"}
          </Button>
          {exists &&
            <Button
              onClick={deleteComponent}
              variant="outlined"
              color="primary"
              size="large"
              style={{ width: 150, height: 50 }}
            >
              Удалить
            </Button>
          }
        </div>
      </div>
  );

}

export default withRouter(Admin);
