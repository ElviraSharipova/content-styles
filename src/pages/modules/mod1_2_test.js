import React from "react";
import {MTxt, MChap, MImg, MParg, MEq, MRadio} from "./typography_short"

const Mod1_2_test = () => (
    <>
    
    <MChap>1.3 Тест</MChap>
    <MTxt>
        <ul style={{lineHeight: "3"}}>
            <li>1.  Какие характерные частоты имеет ультразвук?</li>
            <MRadio name="q1" id="q1_v1">А) более 20 кГц </MRadio>
            <MRadio name="q1" id="q1_v2">Б) 20 000 МГц</MRadio>
            <MRadio name="q1" id="q1_v3">В) Менее 20 Гц </MRadio>
            <MRadio name="q1" id="q1_v4">Г) От 20 до 20 000 Гц</MRadio>
        </ul>
        <ul style={{lineHeight: "3"}}>
            <li>2.  Ультразвуковой сенсор зарегистрировал эхо от препятствия через 17 мс после его отправки. На каком расстоянии от ультразвукового сенсора находится препятствие? Принять скорость звука в воздухе равной 340 м/с</li>
            <MRadio name="q2" id="q2_v1">А) 5.78 м</MRadio>
            <MRadio name="q2" id="q2_v2">Б) 2.89 м</MRadio>
            <MRadio name="q2" id="q2_v3">В) 5 780 м</MRadio>
            <MRadio name="q2" id="q2_v4">Г) 2 890 м</MRadio>
        </ul>
        
        <ul style={{lineHeight: "3"}}>
            <li>3.  Какие из перечисленных факторов влияют на скорость распространения звука в воздухе? </li>
            <MRadio name="q3" id="q3_v1">А) Температура</MRadio>
            <MRadio name="q3" id="q3_v2">Б) Влажность</MRadio>
            <MRadio name="q3" id="q3_v3">В) Ветер</MRadio>
            <MRadio name="q3" id="q3_v4">Г) Все перечисленное</MRadio>
        </ul>
    </MTxt>
    </>
)

export default Mod1_2_test
