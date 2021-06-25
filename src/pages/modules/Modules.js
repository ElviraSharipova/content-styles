import React, { useEffect, useState, useRef } from "react";

import useStyles from "./styles";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import { Button } from "../../components/Wrappers/Wrappers";

import "./modules.scss"
import { Nav } from "./NavBar";
import Test from "./Test.js";
import Stream from "./Stream.js";
import Plot from "./Plot.js";
import Video from "./Video.js";
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
  const [current, setCurrent] = React.useState({ theme: 1, module: 1, component: 1 });

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

  function contentMapper(id, type, title) {
    switch (type) {
      case 'video':
        return <Video id={id} title={title} />
      case 'stream':
        return <Stream id={id} title={title} />
      case 'test':
        return <Test id={id} title={title} />
      case 'text':
        return manualContentMapping[id]
      case 'plot':
        return <Plot id={id} title={title} />
      //case 'venv':
      //  return
      //case 'device':
      //  return
      default:
        return
    }
  }

  function goBack() {
    setCurrent({ theme: current.theme, module: current.module, component: current.component - 1 })
    contentWindow.current.scrollTo(0, 0)
  }

  function goForward() {
    setCurrent({ theme: current.theme, module: current.module, component: current.component + 1 })
    contentWindow.current.scrollTo(0, 0)
  }

  function getComponent() {
    return content.themes[current.theme - 1].modules[current.module - 1].components[current.component - 1]
  }

  if (!content.themes) return (<></>)

  return (
    <>
      <div className="white_module_bgr sub_toolbar" ref={contentWindow}>
        <div className="sub_toolbar sub_module">
          <div>
            {contentMapper(getComponent().id, getComponent().type, `${current.theme}.${current.module}.${current.component} ${getComponent().title}`)}
            <Nav courseId={course_id} content={content} current={current} setCurrent={setCurrent} />
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
