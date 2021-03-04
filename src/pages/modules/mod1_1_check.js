import React from "react";
import { MTxt, MChap, MImg, MParg, MEq, MRadio, MVid, MNav } from "./typography_short";
import { Grid } from "@material-ui/core";
import PlotUltrasonic from './components/PlotUltrasonic';

const Mod1_1_check= () => (
  <div style={{ marginLeft: 24, marginRight: "4%" }}>
    <MChap>
      1.1.2. Проверка работоспособности стенда.
    </MChap>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MTxt>
          <p>Если подключение было успешным, стенд отобразился в разделе "оборудование" и обозначен как активный, попробуйте получить данные со стенда.</p>
          <p>Для этого нажмите кнопку "Начать прием данных" внизу страницы под графиками и убедитесь, что на графиках начали появляться точки - показания датчиков. Поднесите ладонь к сенсору на 10-15см и убедитесь, что показания на графиках изменились.</p>
        </MTxt>
      </Grid>
      <Grid item xs={6}>
        <PlotUltrasonic/>
      </Grid>
    </Grid>
  </div>
)

export default Mod1_1_check
