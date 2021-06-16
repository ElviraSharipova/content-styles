import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  LinearProgress,
  Typography,
  Grid,
  Popover,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Button } from "../../components/Wrappers/Wrappers";

import "./nav.scss"
import "./modules.scss"
import { MNav, MLink } from "./typography_short"
import useStyles from "./styles";
import axios from "axios";
import Cookies from 'js-cookie';
//import { progress } from "./mock.js";
import { check } from "prettier";

const Nav = props => {

  const content = props.content;
  const classes = useStyles();

  var initialOpen = new Array(200).fill(false)
  initialOpen[0] = true

  const [open, setOpen] = React.useState(initialOpen);

  function handleClick(index) {
    open[index] = !open[index];
    setOpen([...open]);
  };

  const [progress, setProgress] = React.useState(0);
  const [courseProgress, setCourseProgress] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(new Array(200).fill(null));

  function handlePopoverOpen(index, event) {
    anchorEl[index] = event.currentTarget
    setAnchorEl([...anchorEl])
  };

  function handlePopoverClose(index) {
    anchorEl[index] = null
    setAnchorEl([...anchorEl])
  };

  function openPopover(index) {
    return Boolean(anchorEl[index])
  }

  function getThemeProgress(theme) {
    for (let progressIndex = 0; progressIndex < progress.theme_progress.length; progressIndex++) {
      if (progress.theme_progress[progressIndex].theme == theme.index) {
        return progress.theme_progress[progressIndex].completed ? 1 : 0;
      }
    }
  };

  function getModuleProgress(module, theme) {
    for (let themeProgressIndex = 0; themeProgressIndex < progress.theme_progress.length; themeProgressIndex++) {
      for (let progressIndex = 0; progressIndex < progress.theme_progress[themeProgressIndex].module_progress.length; progressIndex++) {
        if (progress.theme_progress[themeProgressIndex].module_progress[progressIndex].module == module.index && progress.theme_progress[themeProgressIndex].theme == theme.index) {
          return progress.theme_progress[themeProgressIndex].module_progress[progressIndex].completed ? 1 : 0;
        }
      }
    }
  };

  function getComponentProgress(component, module, theme) {
    for (let themeProgressIndex = 0; themeProgressIndex < progress.theme_progress.length; themeProgressIndex++) {
      for (let moduleProgressIndex = 0; moduleProgressIndex < progress.theme_progress[themeProgressIndex].module_progress.length; moduleProgressIndex++) {
        for (let componentProgressIndex = 0; componentProgressIndex < progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress.length; componentProgressIndex++) {
          if (progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].component == component.id
            && progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].module == module.index
            && progress.theme_progress[themeProgressIndex].theme == theme.index) {
            return progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].completed ? 1 : 0;
          }
        }
      }
    }
  };

  function tryAutoComplete(component, module, theme) {
    if (!getComponentProgress(component, module, theme)) {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.post(`/content/components/${component.id}/complete/`).then(res => {
          if (res.status = 200) {
            setProgress(res.data)
          }
        })
      })
    }
  }

  function handleRestart() {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
      axios.delete(`/content/progress/${progress.id}/restart/`).then(res => {
        if (res.status == 204) {
          axios.post("/content/progress/start/", { course: props.courseId }).then(res => {
            axios.get(`/content/progress/my_progress/?course=${props.courseId}`).then(res => {
              localStorage.setItem("progressId", res.data.id)
              setCourseProgress(res.data.score)
              setProgress(res.data)
            })
          })
        }
      })
    })
  }

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/progress/my_progress/?course=${props.courseId}`).then(res => {
        localStorage.setItem("progressId", res.data.id)
        setCourseProgress(res.data.score)
        setProgress(res.data)
        if (res.status == 204) {
          axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
          axios.post("/content/progress/start/", { course: props.courseId })
        }
      })
    })
  }, []);

  if (!content.themes || !progress) return (<></>)

  return (
    <nav className="nav sub_toolbar">
      <div style={{ margin: 24 }}>
        <Typography variant="h6" style={{ color: "white", marginBottom: 6 }}>{content.title}</Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LinearProgress className={classes.progressBar} color="primary" variant="determinate" value={courseProgress} />
          <div style={{ color: "white" }}>{content.max_score ? `${Math.round((courseProgress || 0) / content.max_score * 100)}%` : "100%"}</div>
        </div>
        <div style={{ color: "white" }}>{`${courseProgress || 0}/${content.max_score || 0}`}</div>
      </div>
      {content.themes.sort((a, b) => a.index > b.index ? 1 : -1).map(t => (
        <ul className="nav_ul">
          <li><Typography variant="subtitle2" style={{ color: "white", margin: 12 }}>{`${content.themes.indexOf(t) + 1}. ${t.title}`}</Typography></li>
          <li>
            {t.modules.sort((a, b) => a.index > b.index ? 1 : -1).map(m => (
              <>
                <span button onClick={() => handleClick(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}>
                  <p className="nav__link">
                    <CheckCircleIcon className={classes.checkmarkPrimary} opacity={getModuleProgress(m, t)} />
                    <Typography
                      variant="body2"
                      noWrap
                      aria-owns={openPopover(content.themes.indexOf(t) * 10 + t.modules.indexOf(m)) ? `mouse-over-popover-${content.themes.indexOf(t) + 1}.${t.modules.indexOf(m) + 1}` : undefined}
                      aria-haspopup="true"
                      onMouseEnter={(event) => handlePopoverOpen(content.themes.indexOf(t) * 10 + t.modules.indexOf(m), event)}
                      onMouseLeave={() => handlePopoverClose(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}
                    >
                      {`${content.themes.indexOf(t) + 1}.${t.modules.indexOf(m) + 1} ${m.title}`}
                    </Typography>
                    <Popover
                      id={`mouse-over-popover-${content.themes.indexOf(t) + 1}.${t.modules.indexOf(m) + 1}`}
                      className={classes.popover}
                      classes={{
                        paper: classes.paper,
                      }}
                      open={openPopover(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}
                      anchorEl={anchorEl[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)]}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={() => handlePopoverClose(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}
                      disableRestoreFocus
                    >
                      <Typography variant="body2">{`${m.title}`}</Typography>
                    </Popover>
                    <div style={{ flexGrow: 1 }} align="right">{open[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
                  </p>
                </span>
                <Collapse in={open[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)]} timeout="auto" unmountOnExit>
                  <ul>
                    {m.components.sort((a, b) => a.index > b.index ? 1 : -1).map(c => (
                      <MLink onClick={() => { tryAutoComplete(c, m, t); props.setCurrent({ theme: t.index, module: m.index, component: c.index }) }}>
                        <CheckIcon className={classes.checkmarkSecondary} opacity={getComponentProgress(c, m, t)} /> {c.title}
                      </MLink>
                    ))}
                  </ul>
                </Collapse>
            </>
            ))}
          </li>
        </ul>
      ))}
      <Button style={{ margin: 24 }} variant="contained" color="primary" onClick={handleRestart}>Пройти заново</Button>
    </nav>
  );
}

const WhBgr = props => ( // {just a kostyl' for white background on the module
    <div className="white_module_bgr sub_toolbar">
        {props.children}
    </div>
)

export {Nav, WhBgr}
