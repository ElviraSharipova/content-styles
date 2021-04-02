import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  ChatController,
} from 'chat-ui-react';
import { ChatView } from "./ChatView";
import Widget from "../Widget";

// components
import { Button, Typography } from "../Wrappers";
import Dot from "../Sidebar/components/Dot";

export default function Chat(props) {

  const [chatCtl] = useState(new ChatController());
  const ws = useRef(null);
  const nickname = localStorage.getItem("nickname") || localStorage.getItem("email");

  useEffect(() => {
    if (ws.current) return;

    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      console.log(token);
      ws.current = new WebSocket("wss://eqviumjs.herokuapp.com/chat/default/", token);
      ws.current.binaryType = 'arraybuffer';
      ws.current.onopen = () => {
        console.log("ws opened");
      }

      ws.current.onmessage = e => {
        if (e.data != null) {
          console.log(e.data);
          var newMessage = JSON.parse(e.data);
          chatCtl.addMessage({
            type: 'text',
            content: newMessage,
            self: false,
          });
        }
      };

      ws.current.onclose = () => console.log("ws closed"); //devs - offline
      return () => {
        ws.current.close();
      };
    }).catch(err => console.error(err));
  }, []);

  React.useMemo(async () => {
    const send = await chatCtl.setActionRequest(
      { type: 'text', always: true, addMessage: false, placeholder: "Отправить сообщение" },
      (response) => {
        console.log(response)
        ws.current.send(response.value);
      }
    );
  }, [chatCtl]);


  return (
    <Widget title={"Чат"} noBodyPadding>
      <ChatView chatController={chatCtl} height={props.height} />
    </Widget>
  );
}
