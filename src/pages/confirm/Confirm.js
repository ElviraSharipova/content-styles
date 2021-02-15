import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  TextField as Input
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, registerUser, confirmUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

const getGreeting = () => {
    return "Подтвердите регистрацию в Eqvium";
};

function Confirm(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get("token");
    if (token) {
      receiveToken(token, userDispatch);
      doInit()(userDispatch);
    }
  }, []); // eslint-disable-line
  

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [keyValue, setKeyValue] = useState("");
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);

  return (
    <Grid container className={classes.container}>
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
            <>
            <React.Fragment>
              {config.isBackend ? (
                <Widget
                  disableWidgetMenu
                  inheritHeight
                  style={{ marginTop: 32 }}
                >
                  <Typography
                    variant={"body2"}
                    block
                    style={{ textAlign: "center" }}
                  >
                    This is a real app with Node.js backend - use
                    <Typography variant={"body2"} weight={"bold"}>
                      "admin@flatlogic.com / password"
                    </Typography>{" "}
                    to login!
                  </Typography>
                </Widget>
              ) : null}
              <Typography variant="h2" className={classes.greeting}>
                {getGreeting()}
              </Typography>
              <Fade
                in={error}
                style={
                  !error ? { display: "none" } : { display: "inline-block" }
                }
              >
                <Typography color="secondary" className={classes.errorMessage}>
                  Пароль или логин неверны :(
                </Typography>
              </Fade>
              <Input
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Пароль"
                type="password"
                fullWidth
              />
              <Input
                id="key"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={keyValue}
                onChange={e => setKeyValue(e.target.value)}
                margin="normal"
                placeholder="Код"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0 || keyValue.length === 0
                    }

                    onClick={() => {
                      confirmUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        keyValue,
                        props.history,
                        setIsLoading,
                        setError
                      )()
                      }
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Войти
                  </Button>
              </div>
            </React.Fragment>
          </>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Confirm);
