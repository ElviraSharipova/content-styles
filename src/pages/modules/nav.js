import React from "react";
import "./nav.scss"
import "./modules.scss"
import { NavLink } from "react-router-dom";

const Nav = () => (
    <nav className="nav sub_toolbar">
        <h2 className="nav__h2">Демонстрационное событие</h2>
        <ul className="nav_ul">
            <li><h4 className="nav__h4">1. Образовательный модуль</h4></li>
            <ul>
                <li><NavLink to="/app/module/1/mod1_1" className="nav__link" activeClassName="nav__link_active">1.1 Ультразвуковой сенсор</NavLink></li>
                <li><NavLink to="/app/module/1/mod1_4"  className="nav__link" activeClassName="nav__link_active">1.2 Лезерный дальномер</NavLink></li>
                <li><NavLink to="/app/module/1/mod1_5"  className="nav__link" activeClassName="nav__link_active">1.3 Оптическая линейка</NavLink></li>
                <li><NavLink to="/app/module/1/mod1_2"  className="nav__link" activeClassName="nav__link_active">1.4 Подключение стенда</NavLink>  </li>
                <li><NavLink to="/app/module/1/mod1_3"  className="nav__link" activeClassName="nav__link_active">1.5 Тест</NavLink></li>
            </ul>
            <li><h4 className="nav__h4">2. Соревновательный модуль</h4></li>
            <ul>
                <li><NavLink to="/app/module/1/mod2_1"  className="nav__link" activeClassName="nav__link_active"> 2.1 О cобытии</NavLink></li>
                <li><NavLink to="/app/module/1/mod2_2"  className="nav__link" activeClassName="nav__link_active"> 2.2 Виртуальная среда</NavLink>  </li>
            </ul>
        </ul>
    </nav>
)

const WhBgr = props => ( // {just a kostyl' for white background on the module
    <div className="white_module_bgr sub_toolbar">
        {props.children}
    </div>
)

export {Nav, WhBgr}
