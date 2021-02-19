import React, { Component } from "react";
import "./nav.scss"
import "./modules.scss"
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

const Nav = () => (
    <nav className="nav sub_toolbar">
        <ul className="nav_ul">
            <li><h5>1. Образовательный модуль</h5></li>
            <ul>
                <li><NavLink to="/app/module/1/mod1_1" className="nav__link" activeClassName="nav__link_active">1.1 Ультразвуковой сенсор</NavLink></li>
                <li><NavLink to="/app/module/1/mod1_2"  className="nav__link" activeClassName="nav__link_active">1.2 Подключение стенда</NavLink>  </li>
                <li><NavLink to="/app/module/1/mod1_3"  className="nav__link" activeClassName="nav__link_active">1.3 Тест</NavLink></li>
            </ul>
            <li><h5>2. Соревновательный модуль. </h5></li>
            <ul>
                <li><NavLink to="/app/module/1/mod2_1"  className="nav__link" activeClassName="nav__link_active"> 2.1 О cобытии</NavLink></li>
                <li><NavLink to="/app/module/1/mod2_2"  className="nav__link" activeClassName="nav__link_active"> 2.2 Виртуальная среда</NavLink>  </li>
            </ul>
        </ul>
    </nav>
)

export default Nav
