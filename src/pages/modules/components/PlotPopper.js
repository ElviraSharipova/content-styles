import React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Popper,
  Divider,
  RadioGroup,
  Box,
  Radio,
  Grid,
  Switch as SwitchMode
} from "@material-ui/core";

//import ReactApexChart from "react-apexcharts";
import ApexLineChart from "./ApexLineChart";

import useStyles from "../styles";

// components
import Widget from "../../../components/Widget";
import { Typography, Button } from "../../../components/Wrappers";
import Themes from "../../../themes";
import { useThemeDispatch } from "../../../context/ThemeContext";

function PlotPopper({ open, id, anchorEl }) {

  const [stream, setStream] = useState(false);
  const [changed, setChanged] = useState(false);
  //var zero_array = new Array(300).fill([0,0]);
  var zero_array = new Array(125).fill([0,0]);
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
            var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : true, \"sensor\":\"head\", \"period\":200}}\n";
            var decoded_str = btoa(payload);
            var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            console.log(str);
            ws.current.send(str);
         }
         if(!stream) {
            console.log("stop stream send");
            var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"head\", \"period\":200}}\n";
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
            //console.log(JSON.parse(e.data));
            let array1;
            if (message["data"]["data"] != null) {
              if (message["data"]["sensor"] == "head") {
                var len = message["data"]["data"].length;
                //console.log("-----");
                for (var i = 0; i < len; i++) {
                //console.log("-----");
                  //console.log(message["data"]["data"][i]);
                  array1 = [...data1, [ message["data"]["data"][i][0], message["data"]["data"][i][1]]];
 //                 array1 = [...data1, [ message["data"]["data"][len-1][0], message["data"]["data"][len-1][1]]];
                  array1.shift();
                  //updateData1(array1);
                }
                //if (message["data"]["data"][0][0] < 10 || message["data"]["data"][0][0] > 290) {
                //  array1 = zero_array;
                //}
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
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement={"left-start"}
      style={{ zIndex: 100, width: "40%" }}
      elevation={4}
    >
      <Widget disableWidgetMenu>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <>
      <Grid container spacing={12}>
 <Grid item xs={12}>
          <Widget title={"Данные с УЗ датчика"} noBodyPadding>
          <ApexLineChart
              data={data1}
              type="line"
              width="700"
              height="350"
            />
          </Widget>
        </Grid>
        </Grid>
</>
          <>
            <Box my={2}>
            <Button
                    color={"primary"}
                    variant={"contained"}
                    className={classes.marginRight}
                    onClick={() => {setStream(!stream); setChanged(true);}}
                  >
                   {stream ? "Остановить передачу" : "Начать передачу"}
                  </Button>
             </Box>
          </>
        </Box>
      </Widget>
    </Popper>
  );
}

export default React.memo(PlotPopper, (prevProps, nextProps) => {
  return prevProps.anchorEl === nextProps.anchorEl;
});
