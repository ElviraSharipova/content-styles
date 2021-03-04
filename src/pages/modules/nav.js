import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  LinearProgress,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "./nav.scss"
import "./modules.scss"
import { MNav } from "./typography_short"
import useStyles from "./styles";

const Nav = props => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(new Array(4).fill(false));

  function handleClick(index) {
    open[index] = !open[index];
    setOpen([...open]);
  };

  const [progress, setProgress] = React.useState(0);

  return (
    <nav className="nav sub_toolbar">
      <ul className="nav_ul">
        <li><h2 className="nav__h2">Демонстрационное событие</h2></li>
        <li><div style={{ marginRight: 24 }}>
          <LinearProgress className={classes.progressBar} color="primary" variant="determinate" value={progress} />
        </div></li>
        <li><h4 className="nav__h4">1. Образовательный модуль</h4></li>
        <ul>

          <span button onClick={handleClick(0)}>
            <p className="nav__link">
              1.1 Настройка стенда
              {open[0] ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open[0]} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_1_settingup" onClick={() => setProgress(7)}>- Подключение</MNav>
              <MNav to="/app/module/1/mod1_1_check" onClick={() => setProgress(14)}>- Проверка работы</MNav>
            </ul>
          </Collapse>

          <span button onClick={handleClick(1)}>
            <p className="nav__link">
              1.2 Ультразвуковой сенсор
              {open[1] ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open[1]} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_2_theory" onClick={() => setProgress(21)}>- Теория</MNav>
              <MNav to="/app/module/1/mod1_2_test" onClick={() => setProgress(28)}>- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_2_experiment1" onClick={() => setProgress(35)}>- Эксперимент</MNav >
            </ul>
          </Collapse>

          <span button onClick={handleClick(2)}>
            <p className="nav__link">
              1.3 Лазерный дальномер
              {open[2] ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open[2]} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_3_theory" onClick={() => setProgress(42)}>- Теория</MNav>
              <MNav to="/app/module/1/mod1_3_test" onClick={() => setProgress(49)}>- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_3_experiment1" onClick={() => setProgress(56)}>- Эксперимент 1</MNav >
              <MNav to="/app/module/1/mod1_3_experiment2" onClick={() => setProgress(63)}>- Эксперимент 2</MNav >
            </ul>
          </Collapse>
          
          <span button onClick={handleClick(3)}>
            <p className="nav__link">
              1.4 Оптическая линейка
              {open[3] ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open[3]} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_4_theory" onClick={() => setProgress(70)}>- Теория</MNav>
              <MNav to="/app/module/1/mod1_4_test" onClick={() => setProgress(77)}>- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_4_experiment1" onClick={() => setProgress(84)}>- Эксперимент</MNav >
            </ul>
          </Collapse>

        </ul>
        <li><h4 className="nav__h4">2. Соревновательный модуль</h4></li>
        <ul>
          <MNav to="/app/module/1/mod2_1_intro" onClick={() => setProgress(91)}> 2.1 О cобытии</MNav >
          <MNav to="/app/module/1/mod2_2_check" onClick={() => setProgress(100)}> 2.2 Виртуальная среда</MNav >
        </ul>
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
