import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import classNames from "classnames";

//images
import profile from "../../images/main-profile.png";
import config from "../../config";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Avatar, Button } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "../../context/LayoutContext";
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext'

import { actions } from '../../context/ManagementContext'
import { useUserDispatch, signOut } from "../../context/UserContext";
import Logo from '../../images/logo-eqvium.png';

const messages = [
];

const notifications = [
];

export default function Header(props) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  const managementDispatch = useManagementDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [isSmall, setSmall] = useState(false);

  const managementValue = useManagementState()

  useEffect(() => {
    actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch)
  }, [])

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;
    setSmall(isSmallScreen);
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <a href="/#/" style={{ marginRight: "10vw" }}><img src={Logo} style={{ marginLeft: 24, marginRight: 24 }} /></a>
        <Button component={Link} href="/#/app/catalog" color={"white"} style={{marginRight: 24}}>Каталог</Button>
        <span style={{ color: "gray", textTransform: "uppercase" }}>Форум</span>
        <div style={{ position: 'fixed', right: '1%' }}>
        <Button href="/#/app/cabinet" variant="outlined" color="primary" size="large" style={{ marginRight: 24 }}><span style={{ marginLeft: 24, marginRight: 24 }}>Вход</span></Button>
        <Button variant="contained" size="large" disabled><span style={{ color: "white" }}>Регистрация</span></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
