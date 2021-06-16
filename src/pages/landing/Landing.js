import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useTheme, makeStyles } from "@material-ui/styles";

import Image from '../../images/landing-page.png';
import Logo from '../../images/syncwoia-logo-06.png';
// styles
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import Header from "../../components/Header/HeaderLanding";

const Landing = props => {
  var classes = useStyles();
  var theme = useTheme();



    return (
      <div>
        <Header history={props.history} />
        <div className={classes.landingBackground}>
          <img src={Logo} />
          <p style={{ fontFamily: "Open Sans", fontSize: 18, marginTop: 40, color: "white", textAlign: "center" }}>
            Откройте новые возможности в образовании с интерактивной платформой <span style={{ fontWeight: "bold" }}>syncwoia</span>
          </p>
        </div>
      </div>
  );

}

export default withRouter(Landing);
