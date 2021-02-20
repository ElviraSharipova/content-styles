import React from "react";
import Unity from "react-unity-webgl";
import Iframe from 'react-iframe';
import ScrollspyNav from "react-scrollspy-nav";

import classnames from 'classnames'

import { Grid, Box, Fab, IconButton} from "@material-ui/core";
import useStyles from "./styles";
import Icon from '@mdi/react'
import { HashLink as Link } from 'react-router-hash-link';

import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";

import img1 from "../../images/mod1_im1.png";
import img2 from "../../images/mod1_im2.png";
import img3 from "../../images/mod1_im3.png";
import img4 from "../../images/mod1_im4.png";
import img5 from "../../images/mod1_im5.png";

import mod2_1 from "../../images/mod2_1.jpg";
import mod2_2 from "../../images/mod2_2.jpg";



// components
import Widget from "../../components/Widget";
import Code from "../../components/Code";
import { Typography } from "../../components/Wrappers";
import PlotPopper from './components/PlotPopper';
import CodePopper from './components/CodePopper';
import Sidebar from '../../components/Sidebar'
import structure from './components/SidebarStructure'

//import { useLayoutState } from '../../context/LayoutContext'
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "../../context/LayoutContext";

import {
    mdiSettings as SettingsIcon,
    mdiChartLine as TimelineIcon,
    mdiKeyboard as KeyboardIcon
} from '@mdi/js'


import classNames from "classnames";
import Nav from "./nav";

const fabStyle = {
    right: 0,
    position: 'fixed',
    zIndex: 100
};

export default function Module (props) {
//  const unityContext = new UnityContext({
//  loaderUrl: "http://159.93.221.48/test/Build/UnityLoader.js",
//  dataUrl: "http://159.93.221.48/test/Build/Venv.data.unityweb",
// / frameworkUrl: "http://159.93.221.48/test/Build/Venv.wasm.framework.unityweb",
//  codeUrl: "Venv.wasm.code.unityweb",
//});

//let unityContent = new UnityContent(
//        "http://159.93.221.48/test/Build/Venv.json",
//        "http://159.93.221.48/test/Build/UnityLoader.js"
//    );

  const classes = useStyles();
var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
//  var userDispatch = useUserDispatch();
 // const managementDispatch = useManagementDispatch();

//   const [isSmall, setSmall] = useState(false);
 
    const module_id = props.match.params.id

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }
  if (module_id == 1) {
  return (
     <>
     <Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={fabStyle}
                >
                    <Icon path={TimelineIcon} size={1} color="#fff" />
                </Fab>
      <PlotPopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
      
      <Nav/>

    <div className={classnames(classes.content, {[classes.contentShift]: true})} >
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Widget title="Знакомство с мобильной платформой" disableWidgetMenu>
<div id= "section_1">
<Typography variant="h5" weight={'medium'}>
                1.1 Ультразвуковой сенсор препятствий

              </Typography>
            <Typography block>
Ультразвук — звуковые волны, имеющие частоту выше воспринимаемых человеческим ухом,имеющих частоты выше 20 000 герц. Хотя о существовании ультразвука известно давно, его практическое использование началось достаточно недавно. В наше время ультразвук нашел применение в различных областях, в первую очередь - в сенсорной и измерительной технике (измерение расстояний, свойств тел, дефектоскопии, медицинской диагностике). 
В качестве демонстрации на стенде имеется ультразвуковой (УЗ) сенсор расстояния HC-SR04. Подобные сенсоры предназначены для детектирования предметов, контроля их движения и измерения расстояний до них. На рис. 1 приведен внешний вид сенсора и его диаграмма направленности (о ней - далее).

            </Typography>
<Typography variant="h5" weight={'medium'}>
                1.2 Ультразвуковой сенсор препятствий

              </Typography>
            <Typography block>
Ультразвук — звуковые волны, имеющие частоту выше воспринимаемых человеческим ухом,имеющих частоты выше 20 000 герц. Хотя о существовании ультразвука известно давно, его практическое использование началось достаточно недавно. В наше время ультразвук нашел применение в различных областях, в первую очередь - в сенсорной и измерительной технике (измерение расстояний, свойств тел, дефектоскопии, медицинской диагностике). 
В качестве демонстрации на стенде имеется ультразвуковой (УЗ) сенсор расстояния HC-SR04. Подобные сенсоры предназначены для детектирования предметов, контроля их движения и измерения расстояний до них. На рис. 1 приведен внешний вид сенсора и его диаграмма направленности (о ней - далее).

            </Typography>
<Typography variant="h5" weight={'medium'}>
                1.4 Ультразвуковой сенсор препятствий

              </Typography>
            <Typography block>
Ультразвук — звуковые волны, имеющие частоту выше воспринимаемых человеческим ухом,имеющих частоты выше 20 000 герц. Хотя о существовании ультразвука известно давно, его практическое использование началось достаточно недавно. В наше время ультразвук нашел применение в различных областях, в первую очередь - в сенсорной и измерительной технике (измерение расстояний, свойств тел, дефектоскопии, медицинской диагностике). 
В качестве демонстрации на стенде имеется ультразвуковой (УЗ) сенсор расстояния HC-SR04. Подобные сенсоры предназначены для детектирования предметов, контроля их движения и измерения расстояний до них. На рис. 1 приведен внешний вид сенсора и его диаграмма направленности (о ней - далее).

            </Typography>
<img
                    src={img4}
                    style={{ width: "25%"}}
                  />
<img
                  
  src={img2}
                    style={{ width: "25%", minHeight: 300 }}
                  />


<Typography variant="h6" weight={'medium'}>
Рисунок 1 - Внешний вид УЗ-сенсора HC-SR04 (слева) и его диаграмма направленности

</Typography>
            <Box mt={6}>

<Typography block>

Принцип работы сенсора заключается в следующем. Блок управления сенсором активирует Излучающий элемент (обозначен буквой T) на короткий промежуток времени (несколько микросекунд). При этому излучается ультразвуковой импульс частотой 40 кГц. Приемный элемент (обозначен буквой R) принимает этот импульс после его отражения от препятствия (эхо). 
Фиксируя временную паузу t между отсылкой и приходом отраженного от препятствия сигнала, а также зная скорость распространения звука в воздухе V (около 340 м/с) можно найти расстояние до препятствия D с помощью формулы:

 </Typography>
</Box>

<Box mt={6}>

<Typography block>
L = tV/2                         (1)
</Typography>
</Box>

<Box mt={6}>

<Typography block>
Деление на 2 в формуле (1) учитывает то, что ультразвуковой импульс проходит двойной путь, “туда и обратно”, поэтому для определения расстояния до препятствия весь пройденный импульсом путь tV надо разделить на 2. 
Следует учесть, что скорость звука в различных средах неодинаковая: в воздухе это 340 м/сек, в дереве - 1500, в воде - 1430. Более того, скорость звука в воздухе зависит от его температуры, поэтому для проведения точных измерений следует ее учитывать. 

Также полезно знать длину волны L ультразвука в воздухе:
</Typography>
</Box>
<Box mt={6}>

<Typography block>

L = V/f,                         (2)
где f - частота ультразвука.
</Typography>
</Box>
<Box mt={6}>

<Typography block>
Таким образом, для частоты 20 000 Гц мы имеем: L = 340 м/с / 20 000 Гц = 1,7 см.
</Typography>
</Box>

<Box mt={6}>
<Typography block>
Важной характеристикой сенсора является диаграмма направленности - зависимость дальности обнаружения предмета от угла. Угол отсчитывается от нормали к плоскости излучателя. Из рис. 1 видно, что максимальное расстояние
</Typography>
</Box>
</div>
          <div id="section2">
<Typography variant="h5" weight={'medium'}>
                1.2 Лазерный инфракрасный дальномер

              </Typography>

            <Typography block>
Мы уже рассмотрели ультразвуковой сенсор, принцип работы которого базируется на измерении времени между отправкой ультразвукового импульса и приемом эха. 
Если заменить ультразвуковые волны на электромагнитные, зная скорость света в воздухе (~300 000 км/с), мы также сможем измерять расстояние до препятствий. 
Стенд оборудован инфракрасным лазерным дальномером VL53L0X, который закреплен на одной турели с ультразвуковым сенсором УЗ. Данный дальномер использует инфракрасный диапазон длин волн (длина волны излучения - 940 нм, сравните с соответствующим значением для УЗ-сенсора).
              </Typography>
<img
                    src={img5}
                    style={{ width: "50%"}}
                  />
<Typography variant="h6" weight={'medium'}>
Рисунок 2 - Параметры приема-передачи инфракрасного лазерного сенсора  VL53L0X 

</Typography>
<Box mt={6}>
<Typography block>
Следует отметить, что данный сенсор имеет меньший угол обзора (25 градусов), нежели ультразвуковой (около 45 градусов), что позволяет повысить угловое разрешение при обнаружении цели (см. рис. 2). 
Диапазон измеряемых расстояний данного сенсора: от 3 см до 2 м. 
Преимуществами подобных сенсоров являются меньшие габариты (например, по сравнению с УЗ сенсорами); качество измерений практически не зависит от отражающих свойств цели. 
Среди недостатков следует отметить возможность искажения результатов при наличии внешней ИК-засветки, например - солнечными лучами. 
Подобные сенсоры нашли широкое применение в различных технических областях. Например, они могут использоваться в качестве датчика приближения в смартфонах; лазерных рулетках. Более сложные сенсоры, представляющие собой массив подобных сенсоров и работающие на подобных принципах, используются для получения 3D-модели объекта (трехмерные сканеры).
</Typography>
</Box>
</div>

          </Widget>

        </Grid>
      </Grid>
</div>
</>
  );
}

return (
    <>
<Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={fabStyle}
                >
                    <Icon  path={KeyboardIcon} size={1} color="#fff" />
                </Fab>
      <CodePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
<Grid container spacing={12}>

            <Typography block>
Данное событие представляет собой командное соревнование, в котором командам предстоит управлять роботом в виртуальной среде, подавая команды через код на языке программирования Python в совместном редакторе кода и выполняя поставленные в событии задачи, которые будут озвучены во время старта события.
Командам предстоит управлять роботом в виртуальной среде, подавая команды через код на языке программирования Python в совместном редакторе кода.
</Typography>
<Typography block>
<Typography className={classes.text} weight="bold">
Задача:</Typography>
 из точки старта добраться до артефакта, который может быть расположен в любой точке виртуальной среды, и, вернуться обратно быстрее команд-соперников.
</Typography>
<img
                    src={mod2_1}
                    style={{ width: "50%"}}
                  />

<Typography block>

<Typography className={classes.text} weight="bold">Пример кода:</Typography>
чтобы заставить робота повернуть налево, пройти 3 шага, повернуть налево и пройти еще 2 шага, ведите в редакторе кода (окно, всплывающее по клику на кнопке справа):

<Code>{`
from robot.robot import Robot
robot = Robot("1")
robot.rotate_left()
robot.move()
robot.move()
robot.move()
robot.rotate_right()
robot.move()
robot.move()
`}</Code>

Вообще, доступны следующие команды управления роботом:
<Code>{`
robot.move() - идти вперед
robot.rotate_left() - поворот налево на 90°
robot.rotate_right() - поворот направо на 90° 

`}</Code>
Управление с клавиатуры:

<Code>{`
W - идти вперед
A - поворот налево на 90°
D - поворот направо на 90° 

`}</Code>



            </Typography>


        <Grid item md={10}>
<Iframe url="http://79.143.25.41/venv"
        frameBorder="0"
        width="100%"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        </Grid>

</Grid>
    </>

);

}
