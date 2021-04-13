import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  LinearProgress,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import "./nav.scss"
import "./modules.scss"
import { MNav } from "./typography_short"
import useStyles from "./styles";
import axios from "axios";
import Cookies from 'js-cookie';
//import { progress } from "./mock.js";
import { check } from "prettier";

const Nav = props => {

  const content = props.content;
  const classes = useStyles();
  const [open, setOpen] = React.useState(new Array(20).fill(false));

  function handleClick(index) {
    open[index] = !open[index];
    setOpen([...open]);
  };

  const [progress, setProgress] = React.useState(0);
  const [courseProgress, setCourseProgress] = React.useState(0);

  function getThemeProgress(theme) {
    for (let progressIndex = 0; progressIndex < progress.theme_progress.length; progressIndex++) {
      if (progress.theme_progress[progressIndex].theme == theme.index) {
        var completed = progress.theme_progress[progressIndex].completed
      }
    }
    return completed ? 1 : 0;
  };

  function getModuleProgress(module, theme) {
    for (let themeProgressIndex = 0; themeProgressIndex < progress.theme_progress.length; themeProgressIndex++) {
      for (let progressIndex = 0; progressIndex < progress.theme_progress[themeProgressIndex].module_progress.length; progressIndex++) {
        if (progress.theme_progress[themeProgressIndex].module_progress[progressIndex].module == module.index && progress.theme_progress[themeProgressIndex].theme == theme.index) {
          var completed = progress.theme_progress[themeProgressIndex].module_progress[progressIndex].completed
        }
      }
    }
    return completed ? 1 : 0;
  };

  function tryAutoComplete(module, theme) {
    if (!getModuleProgress(module, theme)) {
      const ref_token = localStorage.getItem("token_ref");
      axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
        const token = res.data.access;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers['X-CSRFTOKEN'] = Cookies.get('csrftoken');
        axios.post(`/content/modules/${module.id}/complete/`).then(res => {
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
      <ul className="nav_ul">
        <li><h2 className="nav__h2">{content.title}</h2></li>
        <li><div style={{ marginRight: 24 }}>
          <LinearProgress className={classes.progressBar} color="primary" variant="determinate" value={courseProgress} />
          <div style={{ color: "white" }}>{`${courseProgress || 0}/${content.max_score || 0}`}</div>
        </div></li>
        <li>
          {content.themes.map(c => (
            <>
              <span button onClick={() => handleClick(content.themes.indexOf(c))}>
                <p className="nav__link">
                  <CheckCircleIcon className={classes.checkmarkPrimary} opacity={getThemeProgress(c)} />
                  <Typography variant="body2" noWrap>{`${content.themes.indexOf(c) + 1}. ${c.title}`}</Typography>
                  <div style={{ flexGrow: 1 }} align="right">{open[content.themes.indexOf(c)] ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
                </p>
              </span>
              <Collapse in={open[content.themes.indexOf(c)]} timeout="auto" unmountOnExit>
                <ul>
                  {c.modules.map(e => (
                    <MNav to={`/app/course/${props.courseId}/mod${c.index}_${e.index}`} onClick={() => tryAutoComplete(e, c)}><CheckIcon className={classes.checkmarkSecondary} opacity={getModuleProgress(e, c)} /> {e.title}</MNav>
                  ))}
                </ul>
              </Collapse>
          </>
          ))}
        </li>
        <li><Button variant="contained" color="primary" onClick={handleRestart}>Пройти заново</Button></li>
      </ul>
    </nav>
  );
}

const WhBgr = props => ( // {just a kostyl' for white background on the module
    <div className="white_module_bgr sub_toolbar">
        {props.children}
    </div>
)

export {Nav, WhBgr}
