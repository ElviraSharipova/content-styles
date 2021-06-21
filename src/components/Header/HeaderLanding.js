import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Grid,
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  const nickname = localStorage.getItem("nickname") || localStorage.getItem("email");
  const user_id = localStorage.getItem("user");

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
        <a href="/#/" style={{ marginRight: "10vw", flexGrow: 1 }}><img src={Logo} style={{ marginLeft: 24, height: 75 }} /></a>
        <div>
          <Button component={Link} href="/#/app/catalog" color={"white"} style={{marginRight: 24}}>Каталог</Button>
          <Button component={Link} href="/#/app/forum" color={"white"} style={{ marginRight: 24 }} disabled>Форум</Button>
          {user_id == 1 &&
            <Button component={Link} href="/#/admin" color={"white"}>Администрирование</Button>
          }
        </div>
        <div className={classes.grow} />
        {user_id ? (<>
          <div style={{ display: "flex", justifyContent: "left", marginRight: 24 }}>
            <Button
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={e => setProfileMenu(e.currentTarget)}
            >
              <AccountCircleIcon color="primary" fontSize="large"/>
              {/*<Typography variant="body2" weight={"bold"} color="primary" style={{ marginLeft: 12, marginRight: 12, marginTop: 12 }}>
                {nickname}
              </Typography>*/}
              <ArrowDropDownIcon color="primary" />
            </Button>
          </div>
          <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} />
            <Button component={Link} href="/#/app/profile" color={"white"} style={{marginRight: 24}}>
                Настройки
            </Button>
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
                Выход
            </Typography>
          </div>
        </Menu>
        </>) : (
          <div style={{ position: 'fixed', right: 24 }}>
            <Button href="/#/app/catalog" variant="outlined" color="primary" size="large" style={{ marginRight: 10, width: 150, height: 40 }}><span style={{ marginLeft: 24, marginRight: 24 }}>Вход</span></Button>
            <Button href="/#/register" variant="contained" color="primary" size="large" style={{ width: 150, height: 40 }}><span>Регистрация</span></Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
