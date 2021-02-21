import React from "react";
import "./nav.scss"
import "./modules.scss"
import {MNav} from "./typography_short"

const Nav = () => (
    <nav className="nav sub_toolbar">
        <ul className="nav_ul">
            <li><h2 className="nav__h2">Демонстрационное событие</h2></li>
            <li><h4 className="nav__h4">1. Образовательный модуль</h4></li>
            <ul>
                <MNav to="/app/module/1/mod1_1">1.1 Настройка стенда</MNav>
                <ul>
                    <MNav to="/app/module/1/mod1_1_settingup">- Подключение</MNav>
                    <MNav to="/app/module/1/mod1_1_check">- Проверка работы</MNav>
                </ul>
                <MNav to="/app/module/1/mod1_2">1.2 Ультразвуковой сенсор</MNav>
                <ul>
                    <MNav to="/app/module/1/mod1_2_theory">- Теория</MNav>
                    <MNav to="/app/module/1/mod1_2_test">- Тестирование</MNav >
                    <MNav to="/app/module/1/mod1_2_experiment1">- Эксперимент 1</MNav >
                </ul>
                <MNav to="/app/module/1/mod1_3">1.3 Лазерный дальномер</MNav>
                <ul>
                    <MNav to="/app/module/1/mod1_3_theory">- Теория</MNav>
                    <MNav to="/app/module/1/mod1_3_test">- Тестирование</MNav >
                    <MNav to="/app/module/1/mod1_3_experiment1">- Эксперимент 1</MNav >
                    <MNav to="/app/module/1/mod1_3_experiment2">- Эксперимент 2</MNav >
                </ul>
                <MNav to="/app/module/1/mod1_4">1.4 Оптическая линейка</MNav>
                <ul>
                    <MNav to="/app/module/1/mod1_4_theory">- Теория</MNav>
                    <MNav to="/app/module/1/mod1_4_test">- Тестирование</MNav >
                    <MNav to="/app/module/1/mod1_4_experiment1">- Эксперимент 1</MNav >
                </ul>
            </ul>
            <li><h4 className="nav__h4">2. Соревновательный модуль</h4></li>
            <ul>
                <MNav to="/app/module/1/mod2_1_intro"> 2.1 О cобытии</MNav >
                <MNav to="/app/module/1/mod2_2_check"> 2.2 Виртуальная среда</MNav >
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
