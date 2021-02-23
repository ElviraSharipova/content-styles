import React from "react";

import useStyles from "./styles";
import { Route, Switch } from "react-router-dom";

import "./modules.scss"
import {Nav, WhBgr} from "./nav";
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
import Mod2_1_intro from "./mod2_1_intro"
import Mod2_2_check from "./mod2_2_check"

export default function Module (props) {
  const classes = useStyles();
  const module_id = props.match.params.id
  if (module_id == 1) {
  return (
     <>
          <WhBgr> {/*some light kostyling for fully white background without change parent elevent. Need to be removed when parent will be white too*/}
            <div className="sub_toolbar sub_module">
              <Switch >
                  <Route exact path="/app/module/1" >
                    <Mod1_1_settingup />
                  </Route>
                  <Route exact path="/app/module/1/mod1_1">
                    <Mod1_1_settingup />
                  </Route>
                  <Route path="/app/module/1/mod1_1_settingup">
                    <Mod1_1_settingup />
                  </Route>
                  <Route path="/app/module/1/mod1_1_check">
                    <Mod1_1_check />
                  </Route>
                  <Route exact path="/app/module/1/mod1_2">
                    <Mod1_2_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_2_theory">
                    <Mod1_2_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_2_test">
                    <Mod1_2_test />
                  </Route>
                  <Route path="/app/module/1/mod1_2_experiment1">
                    <Mod1_2_experiment1 />
                  </Route>
                  <Route exact path="/app/module/1/mod1_3">
                    <Mod1_3_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_3_theory">
                    <Mod1_3_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_3_test">
                    <Mod1_3_test />
                  </Route>
                  <Route path="/app/module/1/mod1_3_experiment1">
                    <Mod1_3_experiment1 />
                  </Route>
                  <Route path="/app/module/1/mod1_3_experiment2">
                    <Mod1_3_experiment2 />
                  </Route>
                  <Route exact path="/app/module/1/mod1_4">
                    <Mod1_4_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_4_theory">
                    <Mod1_4_theory />
                  </Route>
                  <Route path="/app/module/1/mod1_4_test">
                    <Mod1_4_theory />
                    {/*<Mod1_4_test />*/}
                  </Route>
                  <Route path="/app/module/1/mod1_4_experiment1">
                    <Mod1_4_theory />
                    {/*<Mod1_4_experiment1 />*/}
                  </Route>
                  <Route path="/app/module/1/mod2_1_intro">
                    <Mod2_1_intro />
                  </Route>
                  <Route path="/app/module/1/mod2_2_check">
                    <Mod2_2_check />
                  </Route>
              </Switch>
            </div>
          </WhBgr>
          <Nav/>
     </>
    );
  }
}
