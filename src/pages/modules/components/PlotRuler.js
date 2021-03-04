import React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Box,
  Grid,
  Switch as SwitchMode
} from "@material-ui/core";

import ApexLineChart from "./ApexLineChart";
//import ApexHeatmap from "./ApexHeatmap";
import CustomBarChart from "./CustomBarChart";

import useStyles from "../styles";

// components
import Widget from "../../../components/Widget";
import { Typography, Button } from "../../../components/Wrappers";
import Themes from "../../../themes";
import { useThemeDispatch } from "../../../context/ThemeContext";

function PlotDrawer({ open, id, anchorEl }) {

const [stream, setStream] = useState(false);
const [changed, setChanged] = useState(false);
var zero_array1 = new Array(125).fill([0,0]);
var zero_array2 = new Array(125).fill([0,0]);
const [data1, updateData1] = useState(zero_array1);
const [data2, updateData2] = useState(zero_array2);

const ws = useRef(null);

  useEffect(() => {
        ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
        ws.current.binaryType = 'arraybuffer';
        ws.current.onopen = () => {
          console.log("ws opened");
          var str = "[{\"id\":14,\"type\":\"car\",\"dev_sn\":\"20A-0004\",\"owner\":4,\"allowed_users\":[4]}]";
          ws.current.send(str);
       }
      
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

            payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : true, \"sensor\":\"line\", \"period\":200}}\n";
            decoded_str = btoa(payload);
            str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            ws.current.send(str);

         }
         if(!stream) {
            console.log("stop stream send");
            var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"head\", \"period\":200}}\n";
            var decoded_str = btoa(payload);
            var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            console.log(str);
            ws.current.send(str);
         
            payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"line\", \"period\":200}}\n";
            decoded_str = btoa(payload);
            str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \""+decoded_str+"\"}]";
            ws.current.send(str);
        }
        setChanged(false);

}
    }, [[stream], [changed]]);

    useEffect(() => {
        if (!ws.current) return;
            ws.current.onmessage = e => {
            const message = JSON.parse(e.data);

          if( message.hasOwnProperty('data')) {
            let array1;
            let array2;
            if (message["data"]["data"] != null) {
              if (message["data"]["sensor"] == "head") {
                var len = message["data"]["data"].length;
                for (var i = 0; i < len; i++) {
                  array1 = [...data1, [ message["data"]["data"][i][0], message["data"]["data"][i][1]]];
                  array1.shift();
                  array2 = [...data2, [ message["data"]["data"][i][0], message["data"]["data"][i][2]]];
                  array2.shift();
                }
               updateData1(array1);
               updateData2(array2);
              }
            }
          }
        };
    }, [[data1], [data2]]);




  const classes = useStyles();
  var themeDispatch = useThemeDispatch();
  const handleChangeTheme = e => {
    localStorage.setItem("theme", e.target.value);
    themeDispatch(Themes[e.target.value]);
  };

  return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Widget title="Линейка" upperTitle noBodyPadding>
              <div style={{ padding: 24 }}>
                <CustomBarChart 
                  data={data2}
                  axesLabels={["Угол поворота, градусы", "Расстояние, мм"]}
                />
              </div>
            </Widget>
          </Grid>
        </Grid>
</>
        </Box>
  );
}

export default React.memo(PlotDrawer, (prevProps, nextProps) => {
  return prevProps.anchorEl === nextProps.anchorEl;
});
