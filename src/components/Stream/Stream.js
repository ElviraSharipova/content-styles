import React from "react";
import {
  Button,
  Grid
} from "@material-ui/core";
import Chat from "../Chat";

export default function Stream(props) {
  return (
    <div style={props.style} >
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <iframe align="absmiddle" width="100%" height="100%" src={props.src} frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Grid>
        <Grid item xs={2}>
          <Chat height="60vh" />
        </Grid>
      </Grid>
    </div>
  )
}