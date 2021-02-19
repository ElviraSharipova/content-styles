import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Typography, Button } from '../../components/Wrappers'
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import ApexLineChart from "./components/ApexLineChart";
import ApexHeatmap from "./components/ApexHeatmap";

// components
import Widget from "../../components/Widget/Widget";



export default function Charts(props) {

  var zero_array = new Array(300).fill([0,0]);
  //var 1_array = new Array(300).fill([300,0]);
  //var prev = 0;

  const ws = useRef(null);
  const [data1, updateData1] = useState(zero_array);
  const [data2, updateData2] = useState(zero_array);
  const [data3, updateData3] = useState([0,0,0,0,0,0,0,0]);

  useEffect(() => {
        ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
        ws.current.binaryType = 'arraybuffer';
        ws.current.onopen = () => {
          console.log("ws opened");
        }
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            console.log(JSON.parse(e.data));
            const message = JSON.parse(e.data);
            if( !message.hasOwnProperty('system')) {
            let array1;
            let array2;
            let array3;
            if (message["data"]["data"] != null) {
              if (message["data"]["sensor"] == "head") {
                var len = message["data"]["data"].length;
                //var slice1 = message["data"]["data"].map(function(v){ return [v[0], v[1]] });
                //var slice2 = message["data"]["data"].map(function(v){ return [v[0], v[2]] });
                //array1 = [...data1, [ message["data"]["data"][0][0], message["data"]["data"][0][1]]]; 
                //array2 = [...data2, [ message["data"]["data"][0][0], message["data"]["data"][0][2]]]; 
                for (var i = 0; i < len; i++) {
                  array1 = [...data1, [ message["data"]["data"][i][0], message["data"]["data"][i][1]]];
                  array2 = [...data2, [ message["data"]["data"][i][0], message["data"]["data"][i][2]]];
                  array1.shift();
                  array2.shift();
                }
                //array1 = [...data1, slice1 ]
                //array2 = [...data2, slice2 ]
                //console.log(slice1); 
                //array1.shift();
                //array2.shift();
                if (message["data"]["data"][0][0] < 10 || message["data"]["data"][0][0] > 290) {
                  array1 = zero_array; 
                  array2 = zero_array;
                } 
                updateData1(array1);
                updateData2(array2);
              }
              if (message["data"]["sensor"] == "line") {
                array3 = message["data"]["data"][0];
                updateData3(array3);
              }
            }
          }
        };
    }, [[data1], [data2], [data3]]);
  
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={4} xs={4}>
          <Widget title={"ИК"} noBodyPadding>
            <ApexLineChart
              data={data1}
              type="line"
              height="350"
            />
          </Widget>
        </Grid>
        <Grid item md={4} xs={4}>
           <Widget title={"УЗ"} noBodyPadding>
            <ApexLineChart
              data={data2}
              type="line"
              height="350"
            />
          </Widget>

        </Grid>
        <Grid item md={4} xs={4}>
         <Widget title="Линейка" upperTitle noBodyPadding>
            <ApexHeatmap data={data3}/ >
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
           <Button  variant="contained" color="secondary" >Set Stream</Button>
        </Grid>
      </Grid>
    </>
  );
}


