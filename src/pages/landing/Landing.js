import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useTheme, makeStyles } from "@material-ui/styles";
import { CardMedia } from "@material-ui/core";

import LandingText from '../../images/landing-text.svg';
import Background from '../../images/landing-pic-final-sequence-1.png';
//import Logo from '../../images/syncwoia-logo-06.png';
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
          <CardMedia image={Background} style={{ width: "100%", height: "100%" }} />
          <img src={LandingText} style={{ position: "fixed", left: "6%", top: "calc(50% - 75)", width: "30%", height: "30%" }} />
          {/*<p style={{ fontFamily: "Open Sans", fontSize: 18, marginTop: 40, color: "white", textAlign: "center" }}>
            Откройте новые возможности в образовании с интерактивной платформой <span style={{ fontWeight: "bold" }}>syncwoia</span>
          </p>*/}
        </div>
      </div>
  );

}

export default withRouter(Landing);
