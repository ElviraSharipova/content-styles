import React from "react";
import {MTxt, MChap, MImg, MParg, MEq, MRadio, MVid, MNav} from "./typography_short"
import PlotDrawer from './components/PlotDrawer';

const Mod1_1_check= () => (
  <>
  <MChap>
    Проверка работоспособности стенда
  </MChap>
  <MTxt>
    <p>Если подключение было успешным, стенд отобразился в разделе "оборудование" и обозначен как активный, попробуйте получить данные со стенда.</p>
    <p>Для этого нажмите кнопку "Начать прием данных" внизу страницы под графиками и убедитесь, что на графиках начали появляться точки - показания датчиков. Поднесите ладонь к сенсору на 10-15см и убедитесь, что показания на графиках изменились.</p>
  </MTxt>
  <PlotDrawer/>
  </>
)

export default Mod1_1_check
