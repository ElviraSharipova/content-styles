import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import useStyles from "./styles";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
} from "@material-ui/core";
import Header from "../../components/Header/HeaderLanding";

import axios from "axios";
import Cookies from 'js-cookie';

const Admin = props => {
  var classes = useStyles();

  const [courseName, setCourseName] = useState("Введение в современные нейронауки");
  const [componentName, setComponentName] = useState("Введение");
  const [content, setContent] = React.useState({});
  const [exists, setExists] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [tab, setTab] = React.useState(0);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);

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
          window.scrollTo(0, 0)
        }).catch(err => {
          setHelperText("Error")
          window.scrollTo(0, 0)
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
          window.scrollTo(0, 0)
        }).catch(err => {
          setHelperText("Error")
          window.scrollTo(0, 0)
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
        window.scrollTo(0, 0)
      }).catch(err => {
        setHelperText("Error")
        window.scrollTo(0, 0)
      })
    })
  }

  function updateContent(value, field) {
    if (field == "module") { setExists(false) }
    content[field] = value
    setContent({ ...content })
    setHelperText("")
  }

  function getUsers() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/").then(res => {
        setUsers(res.data)
      })
    })
  }

  function deleteUser() {
    if (users[user].status == "admin") {
      setHelperText("Нельзя удалить аккаунт администратора")
    } else {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get("/profiles/").then(() => {
          axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
          axios.delete(`/profiles/${users[user].id}/`)
          setHelperText("Удалено")
          getUsers()
        })
      })
    }
  }

  const handleChangeUser = (event) => {
    setUser(event.target.value)
    setHelperText("")
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
    setHelperText("")
  }

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Header history={props.history} />
      <div className={classes.fakeToolbar} />
      <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs" style={{ margin: 48 }}>
        <Tab label="Пользователи" value={0} />
        <Tab label="Контент" value={1} />
      </Tabs>
      {tab == 0 ? (
        <div style={{ display: "flex", alignItems: "center", width: 1200, flexDirection: "column" }}>
          <Button
            onClick={getUsers}
            variant="contained"
            color="primary"
          >
            Просмотреть всех пользователей
          </Button>
          <Typography variant="h5" style={{ textAlign: "center", color: "red", marginTop: 24 }}>
            {helperText}
          </Typography>
          {users &&
            <div style={{ display: "flex", alignItems: "center", width: 1200, flexDirection: "column" }}>
              <FormControl component="fieldset" style={{ margin: 48 }}>
                <FormLabel component="legend">Пользователи</FormLabel>
                <RadioGroup aria-label="users" name="users1" value={user} onChange={handleChangeUser}>
                {users.map(e => (
                  <FormControlLabel value={`${users.indexOf(e)}`} key={`${e.id}`} control={<Radio />} label={`${e.email} #${e.id}`} />
                ))}
                </RadioGroup>
              </FormControl>
              <Button
                onClick={deleteUser}
                variant="contained"
                color="primary"
              >
                Удалить
              </Button>
            </div>
          }
        </div>
      ) : (
      <>
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
      </>
      )}
    </div>
  );

}

export default withRouter(Admin);
