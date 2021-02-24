import React from "react";
import {MTxt, MChap, MImg, MParg, MEq, MRadio, MVid, MNav} from "./typography_short"

const Mod1_3_test= () => (
  <>
    <MChap>1.3.2. Тест.</MChap>
    <ul style={{lineHeight: "3"}}>
      <li>В чем заключается принцип работы ИК сенсора расстояния?</li>
      <MRadio name="q1" id="q1_v1">Измеряется время между излучением и приемом отраженного сигнала от цели</MRadio>
      <MRadio name="q1" id="q1_v2">Измеряется изменение частоты излученного и принятого сигналов</MRadio>
      <MRadio name="q1" id="q1_v3">Измеряется изменение мощности излученного и принятого сигналов</MRadio>
    </ul>
    <ul style={{lineHeight: "3"}}>
      <li>Какие факторы могут заметно искажать качество измерения расстояния с помощью ИК сенсора?</li>
      <MRadio name="q2" id="q1_v1">Тип материала цели</MRadio>
      <MRadio name="q2" id="q1_v2">Воздействие ультразвука</MRadio>
      <MRadio name="q2" id="q1_v3">Засветка солнечным светом</MRadio>
    </ul>
  </>
)

export default Mod1_3_test
