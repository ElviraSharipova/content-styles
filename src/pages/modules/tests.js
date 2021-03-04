//images
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpeg";
import img6 from "../../images/img6.jpg";

const tests12 = [
  {
    name: "Name1",
    question: "1.  Какие характерные частоты имеет ультразвук?",
    variants: [
      { value: "1", label: "А) более 20 кГц" },
      { value: "2", label: "Б) 20 000 МГц" },
      { value: "3", label: "В) Менее 20 Гц" },
      { value: "4", label: "Г) От 20 до 20 000 Гц" }
    ],
    answer: "1"
  },
  {
    name: "Name2",
    question: "2.  Ультразвуковой сенсор зарегистрировал эхо от препятствия через 17 мс после его отправки. На каком расстоянии от ультразвукового сенсора находится препятствие? Принять скорость звука в воздухе равной 340 м/с",
    variants: [
      { value: "1", label: "А) 5.78 м" },
      { value: "2", label: "Б) 2.89 м" },
      { value: "3", label: "В) 5 780 м" },
      { value: "4", label: "Г) 2 890 м" }
    ],
    answer: "2"
  },
  {
    name: "Name3",
    question: "3.  Какие из перечисленных факторов влияют на скорость распространения звука в воздухе?",
    variants: [
      { value: "1", label: "А) Температура" },
      { value: "2", label: "Б) Влажность" },
      { value: "3", label: "В) Ветер" },
      { value: "4", label: "Г) Все перечисленное" }
    ],
    answer: "1"
  },
];

const tests13 = [
  {
    name: "Name1",
    question: "В чем заключается принцип работы ИК сенсора расстояния?",
    variants: [
      { value: "1", label: "Измеряется время между излучением и приемом отраженного сигнала от цели" },
      { value: "2", label: "Измеряется изменение частоты излученного и принятого сигналов" },
      { value: "3", label: "Измеряется изменение мощности излученного и принятого сигналов" },
    ],
    answer: "1"
  },
  {
    name: "Name2",
    question: "Какие факторы могут заметно искажать качество измерения расстояния с помощью ИК сенсора?",
    variants: [
      { value: "1", label: "Тип материала цели" },
      { value: "2", label: "Воздействие ультразвука" },
      { value: "3", label: "Засветка солнечным светом" },
    ],
    answer: "1"
  },
];


export { tests12, tests13 }
