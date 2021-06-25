import React, { useEffect } from "react";
import {
  Typography
} from '@material-ui/core';
import axios from "axios";
import useStyles from "./styles";

function VideoConponent(props) {
  var classes = useStyles();

  const [source, setSource] = React.useState("");
  const [text, setText] = React.useState("");
  const [description, setDescription] = React.useState("");

  const ref_token = localStorage.getItem("token_ref");
  axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
    const token = res.data.access;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get("/content/components/" + props.id + "/").then(res => {
      setText(res.data.text)
      setDescription(res.data.description)
      setSource(JSON.parse(res.data.props).source);
    })
  })

  if (!source) return <></>

  return (
    <div style={{ marginLeft: 24, marginRight: "2%", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 24, width: 800 }}>
        {props.title}
      </Typography>
      <Typography style={{ width: 800 }} align='justify'>
        <div className={classes.contentDescription} dangerouslySetInnerHTML={{ __html: description }}></div>
      </Typography>
      <iframe align="absmiddle" width="800" height="450" src={source} frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <Typography style={{ marginTop: 48, width: 800 }} align='left'>
        <div className={classes.contentText} dangerouslySetInnerHTML={{ __html: text }}></div>
      </Typography>
    </div>
  )
}

export default VideoConponent
