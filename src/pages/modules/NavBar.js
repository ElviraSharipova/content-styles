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

//icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';

import { Button } from "../../components/Wrappers/Wrappers";

import "./nav.scss"
import "./modules.scss"
import { MNav, MLink } from "./typography_short"
import useStyles from "./styles";
//import { progress } from "./mock.js";
import { check } from "prettier";

const Nav = props => {

  const content = props.content
  const tryAutoComplete = props.tryAutoComplete
  // const handleRestart = props.handleRestart
  const progress = props.progress
  const courseProgress = props.courseProgress

  const classes = useStyles();

  var initialOpen = new Array(200).fill(false)
  initialOpen[(props.current.theme - 1) * 10 + (props.current.module - 1)] = true

  const [open, setOpen] = React.useState(initialOpen);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(index) {
    open[index] = !open[index];
    setOpen([...open]);
  };

  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  //function openPopover(index) {
  //  return Boolean(anchorEl[index])
  //}

  //const [anchorEl, setAnchorEl] = React.useState(new Array(200).fill(null));

  //function handlePopoverOpen(index, event) {
  //  anchorEl[index] = event.currentTarget
  //  setAnchorEl([...anchorEl])
  //};

  //function handlePopoverClose(index) {
  //  anchorEl[index] = null
  //  setAnchorEl([...anchorEl])
  //};

  //function openPopover(index) {
  //  return Boolean(anchorEl[index])
  //}

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
            return progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].score
          }
        }
      }
    }
  };

  function getComponentCompleted(component, module, theme) {
    for (let themeProgressIndex = 0; themeProgressIndex < progress.theme_progress.length; themeProgressIndex++) {
      for (let moduleProgressIndex = 0; moduleProgressIndex < progress.theme_progress[themeProgressIndex].module_progress.length; moduleProgressIndex++) {
        for (let componentProgressIndex = 0; componentProgressIndex < progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress.length; componentProgressIndex++) {
          if (progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].component == component.id
            && progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].module == module.index
            && progress.theme_progress[themeProgressIndex].theme == theme.index) {
            return progress.theme_progress[themeProgressIndex].module_progress[moduleProgressIndex].component_progress[componentProgressIndex].completed ? 1 : 0
          }
        }
      }
    }
  };

  return (
    <nav className="nav sub_toolbar">
      <div style={{ margin: 24 }}>
        <a href="/#/app/catalog/product/1" style={{ textDecoration: "none" }}><Typography variant="h6" style={{ color: "white", marginBottom: 6 }}>{content.title}</Typography></a>
        <LinearProgress className={classes.progressBar} color="primary" variant="determinate" value={Math.round((courseProgress || 0) / content.max_score * 100)} classes={{ barColorPrimary: classes.barColorPromary }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{ color: "white", cursor: "pointer" }}
            aria-owns={Boolean(anchorEl) ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          >
            {`${courseProgress || 0}/${content.max_score || 0} (минимум: ${content.min_score})`}
          </div>
          <Popover
            id={'mouse-over-popover'}
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={() => setAnchorEl(null)}
            disableRestoreFocus
          >
            <Typography variant="body2">{`Минимальный необходимый балл для успешного завершения онлайн-школы и получения сертификата - ${content.min_score}`}</Typography>
          </Popover>
          <div style={{ color: "white" }}>{content.max_score ? `${Math.round((courseProgress || 0) / content.max_score * 100)}%` : "100%"}</div>
        </div>
      </div>
      {content.themes.sort((a, b) => a.index > b.index ? 1 : -1).map(t => (
        <ul className="nav_ul">
          <li><Typography variant="subtitle2" style={{ color: "white", margin: 12, marginLeft: 18 }}>{`${content.themes.indexOf(t) + 1}. ${t.title}`}</Typography></li>
          <li>
            {t.modules.sort((a, b) => a.index > b.index ? 1 : -1).map(m => (
              <>
                <span button onClick={() => handleClick(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}>
                  <p className="nav__link"
                    style={isEqual({ theme: props.current.theme, module: props.current.module }, { theme: t.index, module: m.index }) && !open[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)] ? { backgroundColor: "#536DFE" } : {}}>
                    <CheckCircleIcon className={classes.checkmarkPrimary} opacity={getModuleProgress(m, t)} />
                    <Typography
                      variant="body2"
                      //noWrap
                      //aria-owns={openPopover(content.themes.indexOf(t) * 10 + t.modules.indexOf(m)) ? `mouse-over-popover-${content.themes.indexOf(t) + 1}.${t.modules.indexOf(m) + 1}` : undefined}
                      //aria-haspopup="true"
                      //onMouseEnter={(event) => handlePopoverOpen(content.themes.indexOf(t) * 10 + t.modules.indexOf(m), event)}
                      //onMouseLeave={() => handlePopoverClose(content.themes.indexOf(t) * 10 + t.modules.indexOf(m))}
                    >
                      {`${content.themes.indexOf(t) + 1}.${t.modules.indexOf(m) + 1} ${m.title}`}
                    </Typography>
                    {/*<Popover
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
                    </Popover>*/}
                    <div style={{ flexGrow: 1 }} align="right">{open[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)] ? <ArrowDropUpIcon style={{ marginLeft: 18 }} /> : <ArrowDropDownIcon style={{ marginLeft: 18 }} />}</div>
                  </p>
                </span>
                <Collapse in={open[content.themes.indexOf(t) * 10 + t.modules.indexOf(m)]} timeout="auto" unmountOnExit>
                  <ul style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    {m.components.sort((a, b) => a.index > b.index ? 1 : -1).map(c => (
                      <MLink onClick={() => { tryAutoComplete(c, m, t); props.setCurrent({ theme: t.index, module: m.index, component: c.index }); props.contentWindow.current.scrollTo(0, 0); }}
                        style={isEqual(props.current, { theme: t.index, module: m.index, component: c.index }) ? { backgroundColor: "#536DFE", paddingRight: 18, paddingTop: 12, paddingBottom: 12 } : { paddingRight: 18, paddingTop: 12, paddingBottom: 12 }} >
                        <CheckIcon className={classes.checkmarkSecondary} opacity={getComponentCompleted(c, m, t)} />
                        {c.type == "test" || c.type == "manual-test" ? (<><CreateIcon className={classes.iconSecondary} /> {`${c.title}`}</>) : (<><PlayArrowIcon className={classes.iconSecondary} /> {`${c.title}`}</>)}
                        {c.max_score > 0 &&
                          <div style={{ marginLeft: 6 }}>{`(${getComponentProgress(c, m, t)}/${c.max_score} баллов)`}</div>
                        }
                      </MLink>
                    ))}
                  </ul>
                </Collapse>
            </>
            ))}
          </li>
        </ul>
      ))}
      {/*<Button style={{ margin: 24 }} variant="contained" color="primary" onClick={handleRestart}>Пройти заново</Button>*/}
    </nav>
  );
}

export {Nav}
