import React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Box,
  Grid,
  Switch as SwitchMode
} from "@material-ui/core";

//import ApexLineChart from "./ApexLineChart";
import CustomLineChart from "./CustomLineChart";
import ApexHeatmap from "./ApexHeatmap";

import useStyles from "../styles";

// components
import Widget from "../../../components/Widget";
import { Typography, Button } from "../../../components/Wrappers";
import Themes from "../../../themes";
import { useThemeDispatch } from "../../../context/ThemeContext";

export default function DataStreamButton({ open, id, anchorEl }) {

  const [stream, setStream] = useState(false);
  const [changed, setChanged] = useState(false);

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
    if (changed) {
      if (stream) {
        console.log("start stream send");
        var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : true, \"sensor\":\"head\", \"period\":200}}\n";
        var decoded_str = btoa(payload);
        var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \"" + decoded_str + "\"}]";
        console.log(str);
        ws.current.send(str);

        payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : true, \"sensor\":\"line\", \"period\":200}}\n";
        decoded_str = btoa(payload);
        str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \"" + decoded_str + "\"}]";
        ws.current.send(str);

      }
      if (!stream) {
        console.log("stop stream send");
        var payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"head\", \"period\":200}}\n";
        var decoded_str = btoa(payload);
        var str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \"" + decoded_str + "\"}]";
        console.log(str);
        ws.current.send(str);

        payload = "{\"slot\": \"data stream\", \"data\" : {\"is on\" : false, \"sensor\":\"line\", \"period\":200}}\n";
        decoded_str = btoa(payload);
        str = "[{\"dev_sn\":\"20A-0004\", \"payload\": \"" + decoded_str + "\"}]";
        ws.current.send(str);
      }
      setChanged(false);

    }
  }, [[stream], [changed]]);

  const classes = useStyles();
  var themeDispatch = useThemeDispatch();
  const handleChangeTheme = e => {
    localStorage.setItem("theme", e.target.value);
    themeDispatch(Themes[e.target.value]);
  };

  return (
    <Grid container spacing={0} alignItems="center" justify="center" direction="column">
      <Grid item xs={6}>
        <Button
          color={"primary"}
          variant={"contained"}
          className={classes.dataStreamButton}
          onClick={() => { setStream(!stream); setChanged(true); }}
        >
        {stream ? "Остановить прием данных" : "Начать прием данных"}
        </Button>
      </Grid>
    </Grid>
  );
}
