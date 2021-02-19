import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useTheme, makeStyles } from "@material-ui/styles";

import Image from '../../images/landing-page.png';
// styles
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import Header from "../../components/Header/HeaderLanding";

const Landing = props => {
  var classes = useStyles();
  var theme = useTheme();



    return (
        <div>
            <Header />
            <img src={Image} style={{ width: '100%' }} />
        </div>
  );

}

export default withRouter(Landing);
