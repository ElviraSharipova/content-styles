import { Button, TextField, makeStyles } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: '1 1 auto',
    display: 'flex',
    '& > *': {
      flex: '1 1 auto',
      minWidth: 0,
    },
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
    '& :last-child': {
      flex: '0 1 auto',
    },
  },
  textInput: {
    fontSize: "0.8rem",
  },
}));

export function ChatInput({ chatController, actionRequest }) {
  const classes = useStyles();
  const chatCtl = chatController;
  const [value, setValue] = React.useState(actionRequest.defaultValue);

  const setResponse = React.useCallback(() => {
    if (value) {
      const res = { type: 'text', value };
      chatCtl.setActionResponse(actionRequest, res);
      setValue('');
    }
  }, [actionRequest, chatCtl, value]);

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        setResponse();
      }
    },
    [setResponse],
  );

  const sendButtonText = actionRequest.sendButtonText
    ? actionRequest.sendButtonText
    : '';

  function toggleSmileMenu() { }

  return (
    <div className={classes.container}>
      <TextField
        placeholder={actionRequest.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        multiline
        inputProps={{ onKeyDown: handleKeyDown }}
        variant="outlined"
        rowsMax={10}
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <Button
        type="button"
        onClick={setResponse}
        disabled={!value}
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
      >
        {sendButtonText}
      </Button>
    </div>
  );
}
