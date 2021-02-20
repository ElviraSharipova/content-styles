import React from "react";

import useStyles from "./styles";
import { Route, Switch } from "react-router-dom";

import "./modules.scss"
import {Nav, WhBgr} from "./nav";
import Mod1_1 from "./mod1_1";
import Mod1_2 from "./mod1_2";
import Mod1_3 from "./mod1_3";
import Mod2_1 from "./mod2_1";
import Mod2_2 from "./mod2_2";

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
                      <Mod1_1/>
                  </Route>
                  <Route path="/app/module/1/mod1_1" >
                    <Mod1_1/>
                  </Route>
                  <Route path="/app/module/1/mod1_2" >
                    <Mod1_2/>
                  </Route>
                  <Route path="/app/module/1/mod1_3" >
                    <Mod1_3/>
                  </Route>
                  <Route path="/app/module/1/mod2_1" >
                    <Mod2_1/>
                  </Route>
                  <Route path="/app/module/1/mod2_2" >
                    <Mod2_2/>
                  </Route>
              </Switch>
            </div>
          </WhBgr>
          <Nav/>
     </>
    );
  }
}
