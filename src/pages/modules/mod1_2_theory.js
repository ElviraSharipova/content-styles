import React from "react";
import img1 from "../../images/modules/1_2_pic1.jpg";
import img2 from "../../images/modules/1_2_pic2.gif";
import { MTxt, MChap, MImg, MParg, MEq, MVid } from "./typography_short"

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const Mod1_2_theory = () => (
  <>
    <MChap>
      1.2.1. Методическая часть. Ультразвуковой сенсор.
    </MChap>
      <p>Ультразвук — звуковые волны, имеющие частоту выше воспринимаемых человеческим ухом,имеющих частоты выше 20 000 герц. Хотя о существовании ультразвука известно давно, его практическое использование началось достаточно недавно. В наше время ультразвук нашел применение в различных областях, в первую очередь - в сенсорной и измерительной технике (измерение расстояний, свойств тел, дефектоскопии, медицинской диагностике). </p>
      <p>В качестве демонстрации на стенде имеется ультразвуковой (УЗ) сенсор расстояния HC-SR04. Подобные сенсоры предназначены для детектирования предметов, контроля их движения и измерения расстояний до них. На рис. 1 приведен внешний вид сенсора.</p>
      <MImg img={img1} >
        Рис. 1 - Внешний вид УЗ-сенсора HC-SR04
      </MImg>
      <p>Более подробно можно посмотреть на сенсор на видео:</p>
      <MVid src="https://www.youtube.com/embed/6zQ-7foF1GE">
        Видеообзор сенсора HC-SR04
      </MVid>
      <p>Принцип работы сенсора заключается в следующем. Блок управления сенсором активирует Излучающий элемент (обозначен буквой T) на короткий промежуток времени (несколько микросекунд). При этому излучается ультразвуковой импульс частотой 40 кГц. Приемный элемент (обозначен буквой R) принимает этот импульс после его отражения от препятствия (эхо).</p>
      <MImg img={img2} > 
        Рис. 2 — Принцип работы УЗ-сенсора 
      </MImg>
      <p>Фиксируя временную паузу t между отсылкой и приходом отраженного от препятствия сигнала, а также зная скорость распространения звука в воздухе V (около 340 м/с) можно найти расстояние до препятствия D с помощью формулы:</p>
    <BlockMath>{"L = \\frac{\\text{tV}}{2}"}</BlockMath>
      <p>Деление на 2 в формуле (1) учитывает то, что ультразвуковой импульс проходит двойной путь, “туда и обратно”, поэтому для определения расстояния до препятствия весь пройденный импульсом путь tV надо разделить на 2. </p>
      <p>Следует учесть, что скорость звука в различных средах неодинаковая: в воздухе это 340 м/сек, в дереве - 1500, в воде - 1430. Более того, скорость звука в воздухе зависит от его температуры, поэтому для проведения точных измерений следует ее учитывать. </p>
      <p>Также полезно знать длину волны L ультразвука в воздухе:</p>
    <BlockMath>{"L = \\frac{\\text{tV}}{2}\\text{, где f - частота ультразвука.}"}</BlockMath>
      <p>Таким образом, для частоты 20 000 Гц мы имеем: L = 340 м/с / 20 000 Гц = 1,7 см.</p>
      <p>Важной характеристикой сенсора является диаграмма направленности - зависимость дальности обнаружения предмета от угла. Угол отсчитывается от нормали к плоскости излучателя. </p>
  </>
)

export default Mod1_2_theory
