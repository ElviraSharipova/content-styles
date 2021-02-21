import React from "react";
import {MTxt, MChap, MImg, MParg, MEq} from "./typography_short"

import img1 from "../../images/modules/2_1_pic1.jpg";

const Mod2_1_intro = () => (
<>
    <MChap>
        2.1 О событии
    </MChap>
    <MTxt>
        <p>Данное событие предназначено для первичного ознакомления с управляемым виртуальным роботом и представляет собой демонстрацию базовых возможностей управления им как непосредственно, так и при помощи программного интерфейса.</p>
        <p>В рамках события на первой стадии участникам дается возможность совместно опробовать управление роботом с помощью клавиатуры. Далее в общем текстовом редакторе участникам предлагается написать простую пошаговую инструкцию для робота, которая сначала приведет его к красному кристаллу внутри тоннеля, а после - в исходную позицию.</p>
    </MTxt>
    <MImg img={img1} />
    <MTxt>
        <p>Программный интерфейс виртуального робота реализован библиотекой robot на языке программирования Python.</p>
        <p>Участники, знакомые с Python, могут ознакомиться с полным описанием библиотеки по ссылке (пока в процессе разработки). Участники, не знакомые с данным языком программирования, могут использовать список готовых команд с описанием их действия и пример готового кода (доступно на следующем шаге).</p>
        <p>Успехов!</p>
    </MTxt>
</>
)

export default Mod2_1_intro
