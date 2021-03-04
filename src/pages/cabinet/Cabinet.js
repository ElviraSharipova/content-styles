import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import ImageMapper from 'react-image-mapper';
import { useTheme, makeStyles } from "@material-ui/styles";

//import Image from '../../images/adrian-marc-amarc-cyberoom-v3.svg';
import Image from '../../images/LK.svg';
// styles
import useStyles from "./styles";


const MAP = {
  name: "my-map",
  areas: [
    { name: "hardware", shape: "poly", coords: [1221.,810, 1051.,810. ,1051.,672. ,1221.,672.], strokeColor: "white" },
    { name: "module", shape: "poly", coords: [1604.,555., 1265.,555., 1265.,370., 1604.,370.], strokeColor: "white"  },
  ]
};


const Cabinet = props => {

  var classes = useStyles();
  var theme = useTheme();

  return (
<ImageMapper src={Image} map={MAP} style={{width:"100%"}} onClick={ area => {area.name === "module" ? props.history.push("/app/catalog") : props.history.push("/app/hardware")}}
    />

  );

}

export default withRouter(Cabinet);
