import React, { useEffect } from "react";
import {
  Typography
} from '@material-ui/core';
import { Grid } from "@material-ui/core";
import PlotUltrasonic from './components/PlotUltrasonic';
import PlotInfrared from './components/PlotInfrared';
import PlotRuler from './components/PlotRuler';
import DataStreamButton from "./components/DataStreamButton";
import axios from "axios";

function Plot(props) {
  const [content, setContent] = React.useState("");

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.id + "/").then(res => {
        setContent(JSON.parse(res.data.props));
      })
    })
  }, []);

  if (!content) return <></>

  return (
    <div style={{ marginLeft: 24, marginRight: "4%" }}>
      <Typography>
        {props.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {content}
        </Grid>
        <Grid item xs={6}>
          {content.infrared && <PlotInfrared />}
          {content.ultrasonic && <PlotUltrasonic />}
          {content.ruler && <PlotRuler />}
          <DataStreamButton />
        </Grid>
      </Grid >
    </div >
  )
}

export default Plot
