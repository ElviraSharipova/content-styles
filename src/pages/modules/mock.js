const progress = {
  id: 2,
  score: 3,
  completed: true,
  course: 1,
  user: 1,
  module_progress: [
    {
      id: 2,
      module: "1_1",
      score: 3,
      completed: false,
    },
    {
      id: 2,
      module: "1_2",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "2_1",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "2_2",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "2_3",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "3_1",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "3_2",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "3_3",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "3_4",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "4_1",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "4_2",
      score: 3,
      completed: false,
    },
    {
      id: 2,
      module: "4_3",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "5_1",
      score: 3,
      completed: true,
    },
    {
      id: 2,
      module: "5_2",
      score: 3,
      completed: true,
    },
  ],
};

const content1 = {
  title: "Демонстрационный курс",
  themes: [
    {
      title: "Настройка стенда",
      index: 1,
      modules: [
        {
          title: "Подключение",
          index: 1,
          progress: 5
        },
        {
          title: "Проверка работы",
          index: 2,
          progress: 10
        },
      ]
    },
    {
      title: "Ультразвуковой сенсор",
      index: 2,
      modules: [
        {
          title: "Теория",
          index: 1,
          progress: 15
        },
        {
          title: "Тестирование",
          index: 2,
          progress: 20
        },
        {
          title: "Эксперимент",
          index: 3,
          progress: 25
        },
      ]
    },
    {
      title: "Лазерный дальномер",
      index: 3,
      modules: [
        {
          title: "Теория",
          index: 1,
          progress: 30
        },
        {
          title: "Тестирование",
          index: 2,
          progress: 35
        },
        {
          title: "Эксперимент 1",
          index: 3,
          progress: 40
        },
        {
          title: "Эксперимент 2",
          index: 4,
          progress: 45
        },
      ]
    },
    {
      title: "Оптическая линейка",
      index: 4,
      modules: [
        {
          title: "Теория",
          index: 1,
          progress: 50
        },
        {
          title: "Тестирование",
          index: 2,
          progress: 55
        },
        {
          title: "Эксперимент 1",
          index: 3,
          progress: 60
        },
      ]
    },
    {
      title: "Нейротех",
      index: 5,
      modules: [
        {
          title: "Теория",
          index: 1,
          progress: 65
        },
        {
          title: "Тестирование",
          index: 2,
          progress: 100
        },
      ]
    }
  ]
};

const content2 = {
  title: "Демонстрационное событие",
  themes: [
    {
      title: "Событие",
      index: 1,
      modules: [
        {
          title: "О событии",
          index: 1,
          progress: 50
        },
        {
          title: "Виртуальная среда",
          index: 2,
          progress: 100
        },
      ]
    },
  ]
}

export { progress, content1, content2 }
