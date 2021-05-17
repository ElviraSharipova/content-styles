//images
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpeg";
import img6 from "../../images/img6.jpg";
import standActive from "../../images/stand_preview.jpg";
import standInactive from "../../images/stand_inactive.png";

export const rows = [
  {
    id: 1,
    img: img3,
    active: true,
    type: "Course",
    title: "Нейротехнологии и нейроанатомия",
    subtitle: "Курс БФУ по нейротехнологиям и нейроанатомии",
    price: 37,
    rating: 5
  },
  {
    id: 2,
    img: standActive,
    active: true,
    type: "Course",
    title: "Интерактивный стенд",
    subtitle: "Обнаружение препятствий и детектирование движений",
    price: 80,
    rating: 5
  },
  {
    id: 3,
    img: img3,
    active: true,
    type: "Event",
    title: "Виртуальная среда",
    subtitle: "Управление роботом в виртуальной среде",
    price: 37,
    rating: 5
  },
  {
    id: 4,
    img: img4,
    active: false,
    type: "Event",
    title: "Неактивное событие",
    subtitle: "Событие не активно",
    price: 37,
    rating: 5
  },
  {
    id: 5,
    img: standInactive,
    active: false,
    type: "Course",
    title: "Неактивный курс",
    subtitle: "Курс не активен",
    price: 37,
    rating: 5
  },
  {
    id: 6,
    img: standInactive,
    active: false,
    type: "Course",
    title: "Неактивный курс",
    subtitle: "Курс не активен",
    price: 37,
    rating: 5
  },
  {
    id: 7,
    img: standInactive,
    active: false,
    type: "Course",
    title: "Неактивный курс",
    subtitle: "Курс не активен",
    price: 37,
    rating: 5
  },
  {
    id: 8,
    img: img4,
    active: false,
    type: "Event",
    title: "Неактивное событие",
    subtitle: "Событие не активно",
    price: 37,
    rating: 5
  }
];
