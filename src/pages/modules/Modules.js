import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import "./modules.scss"
import { Nav, WhBgr } from "./NavBar";
import Test from "./Test.js";
import Stream from "./Stream.js";
import Plot from "./Plot.js";
import Mod1_1_theory from "./mod1_1_theory"
import Mod1_2_theory from "./mod1_2_theory"
import Mod1_3_theory from "./mod1_3_theory"
import Mod1_4_theory from "./mod1_4_theory"
import Mod2_1_intro from "./mod2_1_intro"
import Mod2_2_check from "./mod2_2_check"

export default function Module (props) {
  const classes = useStyles();
  const course_id = props.match.params.id
  const [content, setContent] = React.useState({});

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
        console.log(res.data);
        setContent(res.data);
      })
    })
  }, []);

  function contentMapper(id, type, title) {
    switch (type) {
      case 'video':
        return
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

  if (!content.themes) return (<></>)

  return (
    <>
      <WhBgr> {/*some light kostyling for fully white background without change parent elevent. Need to be removed when parent will be white too*/}
        <div className="sub_toolbar sub_module">
          <Switch >
            {content.themes.map(t => (t.modules.map(m => (m.components.map(c => (
              <Route path={`/app/course/${course_id}/mod${t.index}_${m.index}_${c.index}`}>
                {contentMapper(c.id, c.type, `${m.index}.${c.index} ${c.title}`)}
              </Route>
            ))))))}
          </Switch>
        </div>
      </WhBgr>
      <Nav courseId={course_id} content={content} />
    </>
  );
}
