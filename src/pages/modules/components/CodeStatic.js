import React from "react";
import { useState, useEffect, useRef } from "react";
import Iframe from 'react-iframe';
import Input from "@mui/material/TextField";

import {
  Popper,
  Divider,
  RadioGroup,
  Box,
  Radio,
  Grid,
  Switch as SwitchMode
} from "@mui/material";

//import ReactApexChart from "react-apexcharts";
import ApexLineChart from "./ApexLineChart";

import useStyles from "../styles";

// components
import Widget from "../../../components/Widget";
import { Typography, Button } from "../../../components/Wrappers";
import Themes from "../../../themes";
import { useThemeDispatch } from "../../../context/ThemeContext";

function CodePopper({ open, id, anchorEl }) {

  const [stream, setStream] = useState(false);
  const [changed, setChanged] = useState(false);
  var zero_array = new Array(300).fill([0,0]);
  const [data1, updateData1] = useState(zero_array);

  const ws = useRef(null);

//  ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
//  ws.current.binaryType = 'arraybuffer';

  useEffect(() => {
        ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
        ws.current.binaryType = 'arraybuffer';
        ws.current.onopen = () => {
          console.log("ws opened");
//        ws.current.send("{'id':14,'type':'car','dev_sn':'20A-0004','owner':4,'allowed_users':[4]}");
          var str = "[{\"id\":14,\"type\":\"car\",\"dev_sn\":\"20A-0004\",\"owner\":4,\"allowed_users\":[4]}]";
          //console.log(JSON.stringify(str));
          ws.current.send(str);
          //axios.defaults.headers.common["Authorization"] = "";
       }
       //if (localStorage.getItem("stream") === "on") { console.log("stream on")};
//        if (stream) { console.log("hi"); ws.current.send("hi");}
      
        ws.current.onclose = () => console.log("ws closed"); //devs - offline
        return () => {
            ws.current.close();
        };
    }, []);


  useEffect(() => {
        if (!ws.current) return;
        if(changed) {
          if (stream) { 
            console.log("start stream send");
            var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : true, \"sensor\":\"head\", \"period\":100}}\n";
            var decoded_str = btoa(payload);
            var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            console.log(str);
            ws.current.send(str);
         }
         if(!stream) {
            console.log("stop stream send");
            var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"head\", \"period\":100}}\n";
            var decoded_str = btoa(payload);
            var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            console.log(str);
            ws.current.send(str);
        }
        setChanged(false);

}

         
        //if (!stream) { 
        //  console.log("stop stream");
        //  ws.current.send("stop start");
        // }
            //const message = ;
           // console.log( message);
        
    }, [[stream], [changed]]);

    useEffect(() => {
        if (!ws.current) return;
            ws.current.onmessage = e => {
//            console.log(JSON.parse(e.data));
            const message = JSON.parse(e.data);

          if( message.hasOwnProperty('data')) {
            console.log(JSON.parse(e.data));
            let array1;
            if (message["data"]["data"] != null) {
              if (message["data"]["sensor"] == "head") {
                var len = message["data"]["data"].length;
                for (var i = 0; i < len; i++) {
                  array1 = [...data1, [ message["data"]["data"][i][0], message["data"]["data"][i][1]]];
                  array1.shift();
                }
                if (message["data"]["data"][0][0] < 10 || message["data"]["data"][0][0] > 290) {
                  array1 = zero_array;
                }
               updateData1(array1);
              }
            }
          }
        };
    }, [[data1]]);



//  const data1 = [0,0,0,0,0,0,0,0,0];

  const classes = useStyles();
  var themeDispatch = useThemeDispatch();
  const handleChangeTheme = e => {
    localStorage.setItem("theme", e.target.value);
    themeDispatch(Themes[e.target.value]);
  };

  return (
<Grid container spacing={12}>
        <Grid item md={12}>
<Iframe url="http://79.143.25.41:8082"
        frameBorder="0"
        width="100%"
        height="600px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        </Grid>

</Grid>
  );
}

export default React.memo(CodePopper, (prevProps, nextProps) => {
  return prevProps.anchorEl === nextProps.anchorEl;
});
