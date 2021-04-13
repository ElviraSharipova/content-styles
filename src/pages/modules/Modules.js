import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import "./modules.scss"
import {Nav, WhBgr} from "./NavBar";
import Mod1_1_settingup from "./mod1_1_settingup"
import Mod1_1_check from "./mod1_1_check"
import Mod1_2_theory from "./mod1_2_theory"
import Mod1_2_test from "./mod1_2_test"
import Mod1_2_experiment1 from "./mod1_2_experiment1"
import Mod1_3_theory from "./mod1_3_theory"
import Mod1_3_test from "./mod1_3_test"
import Mod1_3_experiment1 from "./mod1_3_experiment1"
import Mod1_3_experiment2 from "./mod1_3_experiment2"
import Mod1_4_theory from "./mod1_4_theory"
import Mod1_4_test from "./mod1_4_test"
import Mod1_4_experiment1 from "./mod1_4_experiment1"
import Mod1_5_theory from "./mod1_5_theory"
import Mod1_5_test from "./mod1_5_test"
import Mod2_1_intro from "./mod2_1_intro"
import Mod2_2_check from "./mod2_2_check"

//import { content1, content2 } from "./mock.js";

export default function Module (props) {
  const classes = useStyles();
  const course_id = props.match.params.id
  const [content, setContent] = React.useState({});

  const content_mapping = [] //CREATE

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

  if (course_id == 2) {
    return (
      <>
        <WhBgr> {/*some light kostyling for fully white background without change parent elevent. Need to be removed when parent will be white too*/}
          <div className="sub_toolbar sub_module">
            <Switch >
              <Route path="/app/course/2/mod1_1">
                <Mod1_1_settingup />
              </Route>
              <Route path="/app/course/2/mod1_2">
                <Mod1_1_check />
              </Route>
              <Route path="/app/course/2/mod2_1">
                <Mod1_2_theory />
              </Route>
              <Route path="/app/course/2/mod2_2">
                <Mod1_2_test />
              </Route>
              <Route path="/app/course/2/mod2_3">
                <Mod1_2_experiment1 />
              </Route>
              <Route path="/app/course/2/mod3_1">
                <Mod1_3_theory />
              </Route>
              <Route path="/app/course/2/mod3_2">
                <Mod1_3_test />
              </Route>
              <Route path="/app/course/2/mod3_3">
                <Mod1_3_experiment1 />
              </Route>
              <Route path="/app/course/2/mod3_4">
                <Mod1_3_experiment2 />
              </Route>
              <Route path="/app/course/2/mod4_1">
                <Mod1_4_theory />
              </Route>
              <Route path="/app/course/2/mod4_2">
                <Mod1_4_theory />
                {/*<Mod1_4_test />*/}
              </Route>
              <Route path="/app/course/2/mod4_3">
                <Mod1_4_experiment1 />
              </Route>
              <Route path="/app/course/2/mod5_1">
                <Mod1_5_theory />
              </Route>
              <Route path="/app/course/2/mod5_2">
                <Mod1_5_test />
              </Route>
            </Switch>
          </div>
        </WhBgr>
        <Nav courseId={course_id} content={content} />
      </>
    );
  }
  if (course_id == 3) {
    return (
      <>
        <WhBgr> {/*some light kostyling for fully white background without change parent elevent. Need to be removed when parent will be white too*/}
          <div className="sub_toolbar sub_module">
            <Switch >
              <Route path="/app/course/3/mod1_1">
                <Mod2_1_intro />
              </Route>
              <Route path="/app/course/3/mod1_2">
                <Mod2_2_check />
              </Route>
            </Switch>
          </div>
        </WhBgr>
        <Nav courseId={course_id} content={content} />
      </>
    );
  }
}
