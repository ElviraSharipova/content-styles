import React, { useEffect, useState, useRef } from "react";

import useStyles from "./styles";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import { Button } from "../../components/Wrappers/Wrappers";

import "./modules.scss"
import { Nav } from "./NavBar";
import Test from "./Test.js";
import Stream from "./Stream.js";
import Plot from "./Plot.js";
import Video from "./Video.js";
import MultipartContent from "./MultipartContent.js"
import Mod1_1_theory from "./mod1_1_theory"
import Mod1_2_theory from "./mod1_2_theory"
import Mod1_3_theory from "./mod1_3_theory"
import Mod1_4_theory from "./mod1_4_theory"
import Mod2_1_intro from "./mod2_1_intro"
import Mod2_2_check from "./mod2_2_check"

export default function Module (props) {
  const classes = useStyles();
  const history = useHistory();
  const course_id = props.match.params.id
  const [content, setContent] = React.useState({});
  const [current, setCurrent] = React.useState(JSON.parse(localStorage.getItem(`navBarState${course_id}`)) || { theme: 1, module: 1, component: 1 });

  const [progress, setProgress] = React.useState(0);
  const [courseProgress, setCourseProgress] = React.useState(0);

  const contentWindow = useRef(null)

  const manualContentMapping = [
    <Mod1_1_theory />,
    <Mod1_2_theory />,
    <Mod1_3_theory />,
    <Mod1_4_theory />,
    <Mod2_1_intro />,
    <Mod2_2_check />,
  ]

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/courses/${course_id}/`).then(res => {
        setContent(res.data);
      })
    })
  }, []);

  function contentMapper(id, type, title, contentWindow) {
    switch (type) {
      case 'video':
        return <Video id={id} title={title} />
      case 'stream':
        return <Stream id={id} title={title} />
      case 'test':
        return <Test id={id} title={title} contentWindow={contentWindow} manual={false} />
      case 'text':
        return manualContentMapping[id]
      case 'plot':
        return <Plot id={id} title={title} />
      case 'manual-test':
        return <Test id={id} title={title} contentWindow={contentWindow} manual={true} />
      case 'multipart-content':
        return <MultipartContent id={id} title={title} />
      //case 'venv':
      //  return
      //case 'device':
      //  return
      default:
        return
    }
  }

  function getComponentCompleted(component, module, theme) {
    for (let themeProgressIndex = 0; themeProgressIndex < progress.theme_progress.length; themeProgressIndex++) {
      for (let moduleProgressIndex = 0; moduleProgressIndex < progress.theme_progress[themeProgressIndex].module_progress.length; moduleProgressIndex++) {
        for (let componentProgressIndex = 0; componentProgressIndex < progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress.length; componentProgressIndex++) {
          if (progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].component == component.id
            && progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].module == module.index
            && progress.theme_progress[themeProgressIndex].theme == theme.index) {
            return progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].completed ? 1 : 0
          }
        }
      }
    }
  };

  function tryAutoComplete(component, module, theme) {
    if (!getComponentCompleted(component, module, theme)) {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.post(`/content/components/${component.id}/complete/`).then(res => {
          if (res.status = 200) {
            setProgress(res.data)
          }
        })
      })
    }
  }

  function handleRestart() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.delete(`/content/progress/${progress.id}/restart/`).then(res => {
        if (res.status == 204) {
          axios.post("/content/progress/start/", { course: course_id }).then(res => {
            axios.get(`/content/progress/my_progress/?course=${course_id}`).then(res => {
              localStorage.setItem("progressId", res.data.id)
              setCourseProgress(res.data.score)
              setProgress(res.data)
            })
          })
        }
      })
    })
  }

  function saveCurrent(state) {
    localStorage.setItem(`navBarState${course_id}`, JSON.stringify(state))
    setCurrent(state)
  }

  function goBack() {
    saveCurrent({ theme: current.theme, module: current.module, component: current.component - 1 })
    tryAutoComplete(content.themes[current.theme - 1].modules[current.module - 1].components.sort((a, b) => a.index > b.index ? 1 : -1)[current.component - 2], content.themes[current.theme - 1].modules[current.module - 1], content.themes[current.theme - 1])
    contentWindow.current.scrollTo(0, 0)
  }

  function goForward() {
    saveCurrent({ theme: current.theme, module: current.module, component: current.component + 1 })
    tryAutoComplete(content.themes[current.theme - 1].modules[current.module - 1].components.sort((a, b) => a.index > b.index ? 1 : -1)[current.component], content.themes[current.theme - 1].modules[current.module - 1], content.themes[current.theme - 1])
    contentWindow.current.scrollTo(0, 0)
  }

  function getComponent() {
    return content.themes[current.theme - 1].modules[current.module - 1].components.sort((a, b) => a.index > b.index ? 1 : -1)[current.component - 1]
  }

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/progress/my_progress/?course=${course_id}`).then(res => {
        localStorage.setItem("progressId", res.data.id)
        setCourseProgress(res.data.score)
        setProgress(res.data)
        if (res.status == 204) {
          axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
          axios.post("/content/progress/start/", { course: course_id }).then(() => {
            axios.get(`/content/progress/my_progress/?course=${course_id}`).then(res => {
              localStorage.setItem("progressId", res.data.id)
              setCourseProgress(res.data.score)
              setProgress(res.data)
            })
          })
        }
      })
    })
  }, []);

  if (!content.themes || !progress || !getComponent()) return (<></>)

  return (
    <>
      <div className="white_module_bgr sub_toolbar" ref={contentWindow}>
        <div className="sub_toolbar sub_module">
          <div>
            {contentMapper(getComponent().id, getComponent().type, `${current.theme}.${current.module}.${current.component} ${getComponent().title}`, contentWindow)}
            <Nav courseId={course_id} content={content} current={current} setCurrent={saveCurrent} progress={progress} courseProgress={courseProgress} tryAutoComplete={tryAutoComplete} handleRestart={handleRestart} contentWindow={contentWindow} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                <Button style={{ margin: 24 }} variant="contained" color="primary" disabled={!(current.component - 1)}
                  onClick={goBack}
                >
                  Назад
                </Button>
                <Button style={{ margin: 24 }} variant="contained" color="primary" disabled={!(content.themes[current.theme - 1].modules[current.module - 1].components[current.component])}
                  onClick={goForward}
                >
                  Вперед
                </Button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
