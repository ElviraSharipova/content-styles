import { Box, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { Typography as Text } from "../Wrappers";

export function ChatMessage({ id, message }) {
  if (message.deletedAt) {
    return <div id={id} />;
  }

  const l = message.self ? '20%' : 0;
  const r = message.self ? 0 : '20%';
  const bgcolor = message.self ? 'primary.main' : 'background.paper';
  //const color = message.self ? 'primary.contrastText' : 'text.primary';
  const justifyContent = message.self ? 'flex-end' : 'flex-start';

  return (
    //<Grow in>
    //  <Box
    //    id={id}
    //    flex="0 0 auto"
    //    my={1}
    //    pl={l}
    //    pr={r}
    //    display="flex"
    //    justifyContent={justifyContent}
    //  >
    //    <Box
    //      minWidth={0}
    //      py={1}
    //      px={2}
    //      bgcolor={bgcolor}
    //      color={color}
    //      borderRadius={6}
    //      boxShadow={1}
    //    >
          <Typography
            variant="body2"
            style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            {MessageLayout(message.content)}
          </Typography>
    //    </Box>
    //  </Box>
    //</Grow>
  );
}

String.prototype.hexEncode = function () {
  var hex, i;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = (this.charCodeAt(i) * 7).toString(16);
    result += hex.slice(-1);
  }

  return result
}

function MessageLayout(newMessage) {
  if (typeof (newMessage) === "string") return (<span>{newMessage}</span>)
  if (newMessage.source === "system") return (<span style={{ fontWeight: "bold" }}>{newMessage.message.replace(" joined this chat.", " присоединяется к чату.").replace(" left this chat.", " покидает чат.")}</span>)
  var color = "#" + newMessage.source.hexEncode().slice(0, 6).padEnd(6, "f");
  console.log(color);
  return (
    <div>
      <span style={{ fontWeight: "bold", color: color }}>{newMessage.source}: </span>
      <span>{newMessage.message}</span>
    </div>
  )
}
