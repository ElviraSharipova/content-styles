import React from "react";

import { Grid, Box, Fab, IconButton} from "@material-ui/core";
import useStyles from "./styles";
import Icon from '@mdi/react'
import { HashLink as Link } from 'react-router-hash-link';
import classnames from 'classnames'
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";

// components

import "./modules.scss"
import Nav from "./nav";
import Mod1_1 from "./mod1_1";
import Mod1_2 from "./mod1_2";
import Mod1_3 from "./mod1_3";
import Mod2_1 from "./mod2_1";
import Mod2_2 from "./mod2_2";

export default function Module (props) {
  const classes = useStyles();
 
    const module_id = props.match.params.id

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }
  if (module_id == 1) {
  return (
     <>
            <Nav/ >
            <div style={{paddingLeft: "260px", margin: "0"}}>
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
</>
  );
}

return (
    <>
    </>

);

}
