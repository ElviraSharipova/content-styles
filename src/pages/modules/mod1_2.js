import React from "react";
import {MTxt, MChap, MImg, MParg, MEq} from "./typography_short"
import img from "../../images/mod1_im3.png";
import PlotDrawer from './components/PlotDrawer';

const Mod1_2 = () => (
  <>
    <MChap>
      1.4. Подключение стенда
    </MChap>

    <MTxt>
      Порядок подключения следующий:
      <ul>
        <li>1) Включаем питание</li>
        <li>2) Подключение стенда к wi-fi</li> 
        <li>3) Подключение к стенду с помощью ПК (или напрямую к стенду, или к облачной платформе).</li>
        <li>4) Работа стенда в соответствии с аппаратным алгоритмом</li>
      </ul>
    </MTxt>
    <MImg img={img} width="30%">
      Рисунок 1 - Схема подключения стенда.
    </MImg>
    <MTxt>
      Пробуем получить данные со стенда в окне графика:
    </MTxt>
    <PlotDrawer/>
  </>
)

export default Mod1_2
