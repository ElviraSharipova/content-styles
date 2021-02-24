import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import "./nav.scss"
import "./modules.scss"
import { MNav } from "./typography_short"
import useStyles from "./styles";

const Nav = props => {

  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = React.useState(false);

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [open4, setOpen4] = React.useState(false);

  const handleClick4 = () => {
    setOpen4(!open4);
  };

  return (
    <nav className="nav sub_toolbar">
      <ul className="nav_ul">
        <li><h2 className="nav__h2">Демонстрационное событие</h2></li>
        <li><h4 className="nav__h4">1. Образовательный модуль</h4></li>
        <ul>

          <span button onClick={handleClick1}>
            <p className="nav__link">
              1.1 Настройка стенда
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_1_settingup">- Подключение</MNav>
              <MNav to="/app/module/1/mod1_1_check">- Проверка работы</MNav>
            </ul>
          </Collapse>

          <span button onClick={handleClick2}>
            <p className="nav__link">
              1.2 Ультразвуковой сенсор
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_2_theory">- Теория</MNav>
              <MNav to="/app/module/1/mod1_2_test">- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_2_experiment1">- Эксперимент</MNav >
            </ul>
          </Collapse>

          <span button onClick={handleClick3}>
            <p className="nav__link">
              1.3 Лазерный дальномер
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_3_theory">- Теория</MNav>
              <MNav to="/app/module/1/mod1_3_test">- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_3_experiment1">- Эксперимент 1</MNav >
              <MNav to="/app/module/1/mod1_3_experiment2">- Эксперимент 2</MNav >
            </ul>
          </Collapse>
          
          <span button onClick={handleClick4}>
            <p className="nav__link">
              1.4 Оптическая линейка
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </p>
          </span>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <ul>
              <MNav to="/app/module/1/mod1_4_theory">- Теория</MNav>
              <MNav to="/app/module/1/mod1_4_test">- Тестирование</MNav >
              <MNav to="/app/module/1/mod1_4_experiment1">- Эксперимент</MNav >
            </ul>
          </Collapse>

        </ul>
        <li><h4 className="nav__h4">2. Соревновательный модуль</h4></li>
        <ul>
          <MNav to="/app/module/1/mod2_1_intro"> 2.1 О cобытии</MNav >
          <MNav to="/app/module/1/mod2_2_check"> 2.2 Виртуальная среда</MNav >
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
