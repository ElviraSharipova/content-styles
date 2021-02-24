import React from "react";
import {MTxt, MChap, MImg, MParg, MEq} from "./typography_short"

const Mod1_3 = () => (
    <>
    
    <MChap>1.5. Тест</MChap>
    <MTxt>
        <form>
        <ul style={{lineHeight: "3"}}>
            <li>1.  Какие характерные частоты имеет ультразвук?</li>
            <li><input type="radio" name="q1" value="q1" /> А) более 20 кГц</li>
            <li><input type="radio" name="q1" value="q2" />  Б) 20 000 МГц</li>
            <li><input type="radio" name="q1" value="q3" />  В) Менее 20 Гц </li>
            <li><input type="radio" name="q1" value="q4" />  Г) От 20 до 20 000 Гц</li>
            <li><input type="submit" value="Проверить " /></li>
        </ul>
        </form>
        <form>
        <ul style={{lineHeight: "3"}}>
            <li>2.  Ультразвуковой сенсор зарегистрировал эхо от препятствия через 17 мс после его отправки. На каком расстоянии от ультразвукового сенсора находится препятствие? Принять скорость звука в воздухе равной 340 м/с</li>
            <li><input type="radio" name="q1" value="q1" />А) 5.78 м</li>
            <li><input type="radio" name="q1" value="q2" />Б) 2.89 м</li>
            <li><input type="radio" name="q1" value="q3" />В) 5 780 м</li>
            <li><input type="radio" name="q1" value="q4" />Г) 2 890 м</li>
            <li><input type="submit" value="Проверить " /></li>
        </ul>
        </form>
        
        <form>
        <ul style={{lineHeight: "3"}}>
            <li>3.  Какие из перечисленных факторов влияют на скорость распространения звука в воздухе? </li>
            <li><input type="radio" name="q1" value="q1" />А) Температура</li>
            <li><input type="radio" name="q1" value="q2" />Б) Влажность</li>
            <li><input type="radio" name="q1" value="q3" />В) Ветер</li>
            <li><input type="radio" name="q1" value="q4" />Г) Все перечисленное</li>
            <li><input type="submit" value="Проверить " /></li>
        </ul>
        </form>
    </MTxt>
    </>
)

export default Mod1_3
