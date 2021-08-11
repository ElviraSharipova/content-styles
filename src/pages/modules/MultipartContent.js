import React, { useEffect } from "react";
import {
  Typography
} from '@material-ui/core';
import axios from "axios";
import useStyles from "./styles";

function VideoConponent(props) {
  var classes = useStyles();

  const [content, setContent] = React.useState("");

  const ref_token = localStorage.getItem("token_ref");
  axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
    const token = res.data.access;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get("/content/components/" + props.id + "/").then(res => {
      setContent(res.data.text);
    })
  })

  if (!content) return <></>

  return (
    <div style={{ marginLeft: 24, marginRight: "2%", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 24, width: 800 }}>
        {props.title}
      </Typography>
      <Typography style={{ width: 800 }} align='left'>
        <div className={classes.contentText} dangerouslySetInnerHTML={{ __html: content }}></div>
      </Typography>
    </div>
  )
}

export default VideoConponent
