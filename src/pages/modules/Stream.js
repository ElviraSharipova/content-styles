import React, { useEffect } from "react";
import {
  Typography
} from '@material-ui/core';
import Stream from "../../components/Stream";
import axios from "axios";

function StreamConponent(props) {
  const [source, setSource] = React.useState("");
  const [text, setText] = React.useState("");

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get("/content/components/" + props.id + "/").then(res => {
        setText(res.data.text)
        setSource(JSON.parse(res.data.props).source);
      })
    })
  }, []);

  if (!source) return <></>

  return (
    <div style={{ marginLeft: 24, marginRight: "2%", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 24, width: 800 }}>
        {props.title}
      </Typography>
      <Stream src={source} style={{ width: 800 }} />
      <Typography style={{ marginTop: 48, width: 800 }} align='justify'>
        {text}
      </Typography>
    </div>
  )
}

export default StreamConponent
