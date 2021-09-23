import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
  Checkbox,
  FormGroup
} from "@material-ui/core";
import Header from "../../components/Header/HeaderLanding";

import axios from "axios";
import Cookies from 'js-cookie';

import JsonEditor from "../../components/JsonEditor";

const Admin = props => {
  var classes = useStyles();

  const [courseId, setCourseId] = useState("1");
  const [componentName, setComponentName] = useState("Test 1");
  const [content, setContent] = React.useState({});
  const [progress, setProgress] = React.useState({});
  const [courseProgress, setCourseProgress] = React.useState(null);
  const [exists, setExists] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [tab, setTab] = React.useState(2);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [checked, setChecked] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [completed, setCompleted] = React.useState(false);
  const [enableEditor, setEnableEditor] = React.useState(false);
  const [presets, setPresets] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);

  const [state, setState] = React.useState(EditorState.createEmpty());
  const [status, setStatus] = React.useState(null);

  const onEditorStateChange = (editorState) => {
    setState(editorState);
    if (enableEditor) {
      updateContent(draftToHtml(convertToRaw(editorState.getCurrentContent())), "text")
    }
  };

  function findComponent() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/", {
        params: {
          module__theme__course__id: courseId,
          title: componentName
        }
      }).then(res => {
        if (res.data[0]) {
          setContent(res.data[0])
          if (res.data[0].text) {
            let blocksFromHtml = htmlToDraft(res.data[0].text);
            let { contentBlocks, entityMap } = blocksFromHtml;
            setState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap)))
          }
          if (res.data[0].props) {
            setPresets(JSON.parse(res.data[0].props))
          } else {
            setPresets({})
          }
          setCheckpoints(res.data[0].checkpoints)
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
          theme__course__id: courseId,
          title: componentName
        }
      }).then(res => {
        if (res.data[0]) {
          setContent({ module: res.data[0].id })
          setExists(false)
          setHelperText("")
        } else {
          setHelperText("Does not exist")
        }
      })
    })
  }

  function findCourse() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/courses/${courseId}/preview/`).then(res => {
        if (res.data) {
          console.log(res.data)
          setContent(res.data)
          if (res.data.presets) {
            setPresets(JSON.parse(res.data.presets))
          } else {
            setPresets({})
          }
          setHelperText("")
        } else {
          setHelperText("Does not exist")
        }
      })
    })
  }

  function findProgress() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/component_progress/", {
        params: {
          module_progress__theme_progress__course_progress__course__id: courseId,
          component__title: componentName,
          module_progress__theme_progress__course_progress__user__id: user
        }
      }).then(res => {
        if (res.data[0]) {
          console.log(res.data[0])
          setProgress(res.data[0])
          setExists(false)
          setHelperText("")
        } else {
          setHelperText("Does not exist")
        }
      })
    })
  }

  function getCourseProgress() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/courses/${courseId}/progress/`).then(res => {
        setCourseProgress(res.data)
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
        content["props"] = JSON.stringify(presets)
        axios.put(`/content/components/${content.id}/`, content).then(() => {
          axios.put(`/content/checkpoints/edit/`, checkpoints).then(() => {
            setHelperText("Confirmed")
            window.scrollTo(0, 0)
          }).catch(err => {
            setHelperText("Error in checkpoints")
            window.scrollTo(0, 0)
          })
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

  function updateCourse() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      content["presets"] = JSON.stringify(presets)
      axios.patch(`/content/courses/${content.id}/`, content).then(res => {
        setHelperText("Confirmed")
        window.scrollTo(0, 0)
      }).catch(err => {
        setHelperText("Error")
        window.scrollTo(0, 0)
      })
    })
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

  function updateProgress(value, field) {
    progress[field] = value
    setProgress({ ...progress })
    setHelperText("")
  }

  function saveUserProgress() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.put(`/content/component_progress/${progress.id}/score/`, progress).then(res => {
        setHelperText("Confirmed")
        window.scrollTo(0, 0)
      }).catch(err => {
        setHelperText("Error")
        window.scrollTo(0, 0)
      })
    })
  }

  function setCourseScore() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/progress/", {
        params: {
          course__id: courseId,
          user__id: user
        }
      }).then(res => {
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.put(`/content/progress/${res.data[0].id}/score/`, { score: score, completed: completed }).then(res => {
          setHelperText("Confirmed")
          window.scrollTo(0, 0)
        }).catch(err => {
          setHelperText("Error")
          window.scrollTo(0, 0)
        })
      })
    })
  }

  function deleteProgress() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/progress/", {
        params: {
          course__id: courseId,
          user__id: user
        }
      }).then(res => {
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.delete(`/content/progress/${res.data[0].id}/restart/`).then(res => {
          setHelperText("Deleted")
          window.scrollTo(0, 0)
        }).catch(err => {
          setHelperText("Error")
          window.scrollTo(0, 0)
        })
      })
    })
  }

  function getUsers() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/").then(res => {
        setChecked(new Array(res.data.length).fill(false))
        setUsers(res.data)
      })
    })
  }

  function deleteUsers() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/").then(() => {
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        for (let index = 0; index < users.length; index++) {
          if (users[index].status == "admin") {
            setHelperText("Нельзя удалить аккаунт администратора")
          } else {
            axios.delete(`/profiles/${users[index].id}/`)
            setHelperText("Удалено")
          }
        }
        getUsers()
      })
    })
  }

  function addStudents() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/").then(() => {
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        console.log(users.filter(e => checked[users.indexOf(e)]).map(e => e.id))
        axios.put(`/content/courses/${courseId}/enroll/`, { "whitelist": users.filter(e => checked[users.indexOf(e)]).map(e => e.id) })
      })
    })
  }

  function removeStudents() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/").then(() => {
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        console.log(users.filter(e => checked[users.indexOf(e)]).map(e => e.id))
        axios.delete(`/content/courses/${courseId}/enroll/`, { "whitelist": users.filter(e => checked[users.indexOf(e)]).map(e => e.id) })
      })
    })
  }

  const handleChangeUser = (event) => {
    checked[event.target.value] = !checked[event.target.value]
    setChecked([...checked])
    setHelperText("")
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
    setHelperText("")
  }

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/profiles/my_profile/").then(res => {
        setStatus(res.data.status)
      })
    })
  }, []);

  if (!status == "moderator" || !status == "admin") return (<></>)

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Header history={props.history} />
      <div className={classes.fakeToolbar} />
      <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs" style={{ margin: 48 }}>
        {status == "admin" && <Tab label="Пользователи" value={0} />}
        {status == "admin" && <Tab label="Баллы" value={1} />}
        <Tab label="Контент" value={2} />
        <Tab label="Курсы" value={3} />
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
                <FormGroup aria-label="users" name="users1">
                {users.sort((a, b) => a.id > b.id ? 1 : -1).map(e => (
                  <FormControlLabel
                    value={`${users.indexOf(e)}`}
                    key={`${e.id}`}
                    control={<Checkbox color="primary" checked={checked[users.indexOf(e)]} value={users.indexOf(e)} onChange={handleChangeUser} />}
                    label={`${e.email} #${e.id}`}
                  />
                ))}
                </FormGroup>
              </FormControl>
              {/*<Button
                onClick={deleteUsers}
                variant="contained"
                color="primary"
              >
                Удалить
              </Button>*/}
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  id="courseId"
                  variant="outlined"
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  placeholder="ID курса"
                  type="email"
                  fullWidth
                  style={{ margin: 24 }}
                />
                <Button
                  onClick={addStudents}
                  variant="contained"
                  color="primary"
                >
                  Дать доступ
                </Button>
                <Button
                  onClick={removeStudents}
                  variant="contained"
                  color="primary"
                >
                  Забрать доступ
                </Button>
              </div>
            </div>
          }
        </div>
      ) : tab == 1 ? (
          <>
            <div style={{ width: 1200, padding: 48 }}>
              <TextField
                  id="courseId"
                  variant="outlined"
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  placeholder="ID курса"
                  type="email"
                  fullWidth
                  style={{ margin: 24 }}
                />
              <Button
                onClick={getCourseProgress}
                variant="contained"
                color="primary"
              >
                Посмотреть прогресс по курсу
              </Button>
              {courseProgress && courseProgress.sort((a, b) => a.user > b.user ? 1 : -1).map(e => (
                  <Typography>
                    {e.user}: {e.score} - {e.completed ? "Пройдено" : "Не пройдено"}
                  </Typography>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: 1200 }}>
              <TextField
                id="courseId"
                variant="outlined"
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                placeholder="ID курса"
                type="email"
                fullWidth
                style={{ margin: 24 }}
              />
              <TextField
                id="componentName"
                variant="outlined"
                value={componentName}
                onChange={e => setComponentName(e.target.value)}
                placeholder="Название компонента"
                type="name"
                fullWidth
                style={{ margin: 24 }}
              />
              <TextField
                id="componentName"
                variant="outlined"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="ID пользователя"
                type="name"
                fullWidth
                style={{ margin: 24 }}
              />
              <div style={{ margin: 24 }}>
                <Button
                  onClick={findProgress}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 150, height: 50, marginBottom: 6 }}
                >
                  Редактировать
                </Button>
              </div>
            </div>
            <div style={{ width: 1200, padding: 48 }}>
              <Typography variant="h5" style={{ textAlign: "center", color: "red" }}>
                {helperText}
              </Typography>
              <TextField
                variant="outlined"
                value={progress.completed}
                onChange={e => updateProgress(e.target.value, "completed")}
                placeholder="Completed"
                type="email"
                fullWidth
              />
              <TextField
                variant="outlined"
                value={progress.score}
                onChange={e => updateProgress(e.target.value, "score")}
                placeholder="Score"
                type="email"
                fullWidth
              />
              <Button
                onClick={saveUserProgress}
                variant="outlined"
                color="primary"
                size="large"
                style={{ width: 150, height: 50 }}
              >
                Сохранить
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: 1200 }}>
              <TextField
                id="courseId"
                variant="outlined"
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                placeholder="ID курса"
                type="email"
                fullWidth
                style={{ margin: 24 }}
              />
              <TextField
                id="componentName"
                variant="outlined"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="ID пользователя"
                type="name"
                fullWidth
                style={{ margin: 24 }}
              />
              <TextField
                id="componentName"
                variant="outlined"
                value={score}
                onChange={e => setScore(e.target.value)}
                placeholder="Баллы за курс"
                type="name"
                fullWidth
                style={{ margin: 24 }}
              />
              <TextField
                id="componentName"
                variant="outlined"
                value={completed}
                onChange={e => setCompleted(e.target.value)}
                placeholder="Completed"
                type="name"
                fullWidth
                style={{ margin: 24 }}
              />
              <div style={{ margin: 24 }}>
                <Button
                  onClick={setCourseScore}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 150, height: 50, marginBottom: 6 }}
                >
                  Сохранить
                </Button>
                <Button
                  onClick={deleteProgress}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 150, height: 50 }}
                >
                  Удалить прогресс
                </Button>
              </div>
            </div>
          </>
      ) : tab == 2 ? (
      <>
        <div style={{ display: "flex", justifyContent: "center", width: 1200 }}>
          <TextField
            id="courseId"
            variant="outlined"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            placeholder="ID курса"
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
          {Object.entries(content).map(c => (
            c[0] != "id" && c[0] != "props" && c[0] != "checkpoints" &&
            <TextField
              variant="outlined"
              value={c[1]}
              onChange={e => updateContent(e.target.value, c[0])}
              placeholder={c[0]}
              type="email"
              helperText={c[0]}
              fullWidth
              multiline
              style={{ margin: 12 }}
            />
          ))}
          {!exists &&
          <>
          <TextField
            variant="outlined"
            value={content.module}
            onChange={e => updateContent(e.target.value, "module")}
            placeholder="Module"
            type="email"
            fullWidth
            style={{ margin: 12 }}
          />
          <TextField
            variant="outlined"
            value={content.index}
            onChange={e => updateContent(e.target.value, "index")}
            placeholder="Index"
            type="email"
            fullWidth
            style={{ margin: 12 }}
          />
          <TextField
            variant="outlined"
            value={content.title}
            onChange={e => updateContent(e.target.value, "title")}
            placeholder="Title"
            type="email"
            fullWidth
            style={{ margin: 12 }}
          />
          <TextField
            variant="outlined"
            value={content.type}
            onChange={e => updateContent(e.target.value, "type")}
            placeholder="Type"
            type="email"
            fullWidth
            style={{ margin: 12 }}
          />
          <TextField
            variant="outlined"
            value={content.min_score}
            onChange={e => updateContent(e.target.value, "min_score")}
            placeholder="Min score"
            type="email"
            fullWidth
            style={{ margin: 12 }}
          />
          <TextField
            variant="outlined"
            value={content.props}
            onChange={e => updateContent(e.target.value, "props")}
            placeholder="Props"
            type="email"
            fullWidth
            multiline
            style={{ margin: 12 }}
          /></>}
          {presets &&
            <>
              <Typography>Props</Typography>
              <JsonEditor data={presets} />
            </>
          }
          {checkpoints &&
            <>
              <Typography>Checkpoints</Typography>
              <JsonEditor data={checkpoints} />
            </>
          }
          {enableEditor && 
            <div>
              <Editor
                editorState={state}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          }
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
          {exists && 
            <><Typography>
              Включить визуальный редактор (не рекомендуется использовать с контентом, при создании которого редактор не использовался)
            </Typography>
            <Checkbox
              checked={enableEditor}
              onChange={() => setEnableEditor(!enableEditor)}
              color="primary"
            /></>
          }
        </div>
      </>
      ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center", width: 1200 }}>
                <TextField
                  id="courseId"
                  variant="outlined"
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  placeholder="ID курса"
                  type="email"
                  fullWidth
                  style={{ margin: 24 }}
                />
                <Button
                  onClick={findCourse}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 150, height: 50, marginBottom: 6 }}
                >
                  Найти курс
                </Button>
              </div>
              <div style={{ width: 1200, padding: 48 }}>
                <Typography variant="h5" style={{ textAlign: "center", color: "red" }}>
                  {helperText}
                  </Typography>
                  {Object.entries(content).map(c => (
                    c[0] != "id" && c[0] != "presets" && c[0] != "rating" && c[0] != "is_public" && c[0] != "expire" &&
                    <TextField
                      variant="outlined"
                      value={c[1]}
                      onChange={e => updateContent(e.target.value, c[0])}
                      placeholder={c[0]}
                      type="email"
                      helperText={c[0]}
                      fullWidth
                      multiline
                      style={{ margin: 12 }}
                    />
                  ))}
                  {presets && <JsonEditor data={presets} />}
                  <Button
                    onClick={updateCourse}
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ width: 150, height: 50 }}
                  >
                    Обновить
                  </Button>
              </div>
            </>
      )}
    </div>
  );

}

export default withRouter(Admin);
