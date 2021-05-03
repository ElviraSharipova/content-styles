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
  const nickname = localStorage.getItem("nickname") || localStorage.getItem("email");

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
        <a href="/#/" style={{ marginRight: "10vw" }}><img src={Logo} style={{ marginLeft: 24 }} /></a>
        <Button component={Link} href="/#/app/cabinet" color={"white"}>Личный кабинет</Button>
        <Button component={Link} href="/#/app/catalog" color={"white"}>Каталог</Button>
        <Button component={Link} href="/#/app/courses" color={"white"} disabled>Курсы и события</Button>
        <Button component={Link} href="/#/app/commands" color={"white"} disabled>Мои команды</Button>
        <Button component={Link} href="/#/app/hardware" color={"white"}>Оборудование</Button>
        <div className={classes.grow} />
        {/*<IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>*/}
        <div style={{ display: "flex", justifyContent: "left" }}>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={e => setProfileMenu(e.currentTarget)}
          >
            <Avatar
              alt="Robert Cotton"
              src={config.isBackend ? (managementValue.currentUser && managementValue.currentUser.avatar.length >=1 && managementValue.currentUser.avatar[managementValue.currentUser.avatar.length-1].publicUrl || profile) : profile}
              classes={{ root: classes.headerIcon }}
            />
          </IconButton>
          <Typography variant="body2" weight={"bold"} color="primary" style={{ marginLeft: 12, marginRight: 24, marginTop: 12 }}>
            {nickname}
          </Typography>
        </div>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Новые сообщения
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              Новых сообщений: {messages.length}
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Отправить сообщение
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
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
      </Toolbar>
    </AppBar>
  );
}
