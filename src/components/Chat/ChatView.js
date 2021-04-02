import { makeStyles } from '@material-ui/core';
import React from 'react';

import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      maxWidth: '100%',
      maxHeight: '60vh',
    },
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  messages: {
    flex: '1 1 0%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      maxWidth: '100%',
    },
  },
  action: {
    flex: '0 1 auto',
    display: 'flex',
    alignContent: 'flex-end',
    '& > *': {
      minWidth: 0,
    },
  },
}));

export function ChatView({ chatController, height }) {
  const classes = useStyles();
  const chatCtl = chatController;
  const [messages, setMessages] = React.useState(chatCtl.getMessages());
  const [actReq, setActReq] = React.useState(chatCtl.getActionRequest());

  const msgRef = React.useRef(null);
  const scroll = React.useCallback(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
      // msgRef.current.scrollIntoView(true);
    }
  }, [msgRef]);
  React.useEffect(() => {
    function handleMassagesChanged() {
      setMessages([...chatCtl.getMessages()]);
      scroll();
    }
    function handleActionChanged() {
      setActReq(chatCtl.getActionRequest());
      scroll();
    }
    chatCtl.addOnMessagesChanged(handleMassagesChanged);
    chatCtl.addOnActionChanged(handleActionChanged);
  }, [chatCtl, scroll]);

  const unknownMsg = {
    type: 'text',
    content: 'Unknown message.',
    self: false,
  };

  return (
    <div className={classes.container} style={{ height: height }}>
      <div className={classes.messages} ref={msgRef}>
        {messages.map(
          (msg) => {
            if (msg.type === 'text' || msg.type === 'jsx') {
              return (
                <ChatMessage
                  key={messages.indexOf(msg)}
                  id={`cu-msg-${messages.indexOf(msg) + 1}`}
                  message={msg}
                />
              );
            }
            return (
              <ChatMessage
                key={messages.indexOf(msg)}
                id={`cu-msg-${messages.indexOf(msg) + 1}`}
                message={unknownMsg}
              />
            );
          },
        )}
      </div>
      <div className={classes.action}>
        {actReq && actReq.type === 'text' && (
          <ChatInput
            chatController={chatCtl}
            actionRequest={actReq}
          />
        )}
      </div>
    </div>
  );
}
