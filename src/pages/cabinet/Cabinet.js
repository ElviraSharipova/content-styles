import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Typography, Chip, Button } from "../../components/Wrappers";

import {
  Link
} from "@material-ui/core";

import ImageMapper from 'react-image-mapper';
import { useTheme, makeStyles } from "@material-ui/styles";

//import Image from '../../images/adrian-marc-amarc-cyberoom-v3.svg';
import Image from '../../images/LK_v2.jpg';
import Image_courses from '../../images/courses_btn.svg';
import Image_hardware from '../../images/hardware_btn.svg';

// styles
import useStyles from "./styles";
import useWindowDimensions from './components/useWindowDimensions';

const MAP = {
  name: "my-map",
  areas: [
//    { name: "hardware", shape: "poly", coords: [1221.,810, 1051.,810. ,1051.,672. ,1221.,672.], strokeColor: "white" },
    //{ name: "hardware", shape: "poly", coords: [811,640, 945,640 ,945,525 ,811,525], strokeColor: "white" },
    { name: "hardware", shape: "poly", coords: [811,640, 945,640 ,945,525 ,811,525]},
//    { name: "module", shape: "poly", coords: [1604.,555., 1265.,555., 1265.,370., 1604.,370.], strokeColor: "white"  },
    //{ name: "module", shape: "poly", coords: [1244,455, 975,455, 975,290, 1244.,290], strokeColor: "white"  },
    { name: "module", shape: "poly", coords: [1244,455, 975,455, 975,290, 1244.,290]},
  ]
};


const divStyle = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  //maxHeight: '100vh',  
  backgroundImage: `url(${Image})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  left: '0',
  top: '0',
};

const myStyle = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  //minHeight: '1000px',  
  //backgroundPosition: 'center',
  //backgroundSize: 'cover',
  //backgroundRepeat: 'no-repeat',
  left: '0',
  top: '0',
  zIndex: '1',
  userSelect: 'none',
};

//<ImageMapper src={Image} map={MAP} style={{width:"100%"}} onClick={ area => {area.name === "module" ? props.history.push("/app/module/1") : props.history.push("/app/hardware")}}/>

//<div className="cComponent" style={divStyle} onClick={ area => {area.name === "module" ? props.history.push("/app/module/1") : props.history.push("/app/hardware")}} >
//</div>
//<div className="cComponent" style={divStyle} onClick={e => {console.log(e)}}></div>

//<img src={Image} style={myStyle}/>
//<area target="" coords="1221.,810, 1051.,810. ,1051.,672. ,1221.,672." shape="poly" onClick={this.consoleMessage("bpleft")} alt="bpleft" title="bpleft"/>

//<img style={myStyle} src={Image} usemap="#my-map" alt=""/>
//<map name="my-map" style="cursor: pointer;"><area shape="poly" coords="1221,810,1051,810,1051,672,1221,672"><area shape="poly" coords="1604,555,1265,555,1265,370,1604,370"></map>

//<ImageMapper src={Image} map={MAP} style={myStyle} width={1485} imgWidth={width} onClick={ area => {area.name === "module" ? props.history.push("/app/module/1") : props.history.push("/app/hardware")}}/>
const Cabinet = props => {

  const { height, width } = useWindowDimensions();

  var classes = useStyles();
  var theme = useTheme();

  return (
<div className="cComponent" style={divStyle}>
          <Button component={Link} href="/#/app/harware" style={{ textDecoration: "none", position: "absolute", marginTop: "69vh", marginLeft: "38vw", backgroundImage: `url(${Image_hardware})`, backgroundRepeat: "no-repeat", width:150, height: 60 }} ></Button>
          <Button component={Link} href="/#/app/catalog" style={{ textDecoration: "none", position: "absolute", marginTop: "42vh", marginLeft: "62vw", backgroundImage: `url(${Image_courses})`, backgroundRepeat: "no-repeat", width:205, height: 60 }}></Button>

</div>
  );

}

export default withRouter(Cabinet);
