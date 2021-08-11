import React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
  Star as StarIcon,
  StarBorder as StarOutlinedIcon,
  ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons";
import {
  mdiFacebook as FacebookIcon,
  mdiInstagram as InstagramIcon,
  mdiTwitter as TwitterIcon
} from "@mdi/js";
import useStyles from "./styles";
import { yellow } from "@material-ui/core/colors/index";

//components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography, Link, Button } from "../../components/Wrappers";

//images
import img1 from "../../images/img1.jpg";
import img1_1 from "../../images/img1_1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpeg";
import img6 from "../../images/img6.jpg";
import payment1 from "../../images/mastercard.svg";
import payment2 from "../../images/paypal.svg";
import payment3 from "../../images/visa.svg";
import payment4 from "../../images/aexpress.svg";
import standActive from "../../images/stand_preview.jpg";
import standInactive from "../../images/stand_inactive.png";
import Logo from '../../images/bfu-logo.png';
import bfuImg from "../../images/bfu-syncwoia-01.png";
import bitronicsImg from "../../images/bitronics_background.png";
import bitronicsLogo from "../../images/bitronics.png";

export const rows = [
  {
    id: 2,
    img: bfuImg,
    logo: Logo,
    title: "Онлайн-школа “Введение в современные нейронауки”",
    subtitle: "Вы узнаете о современных направлениях и концепциях в области нейронауки и их связи с развивающимися направлениями техники; Познакомитесь с основными методами, использующимися для проведения исследований в нейроанатомии, нейрофизиологии и нейропсихологии; Повысите свой уровень знаний по анатомии головного мозга, электрофизиологии и даже психологии; Увидите основные эксперименты из разных областей нейробиологии и поймете принципы получения, обработки и интерпретации экспериментальных данных.",
    description: "Участники онлайн-школы по основам современных нейронаук получат теоретические и практические знания в области нейробиологии и психологии. Мы разберем основные термины и явления, необходимые для знакомства с этими сложными научными областями. В 8 самостоятельных работах участники смогут на практике применить полученные знания, столкнувшись с исследовательскими задачами, которые решают ученые-нейробиологи. Практические работы предполагают работу с современным программным обеспечением и обучающими симуляторами. Школа построена в виде 3 модулей, в которых последовательно рассмотрены различные разделы нейробиологии: нейроанатомия, нейрофизиология и нейропсихология. Теоретический материал представлен по принципу от простого к сложному и позволяет пройти путь от строения отдельного нейрона к суммарной электрической активности мозга и таким психическим явлениям как восприятие и мышление. По пути от нейрона к психике мы рассмотрим структуру нервной системы, электрические процессы в ней и ее основные функции. Материал курса освещает как ключевые теоретические вопросы нейробиологии, так и их практическое применение. Онлайн - школа рассчитана на учеников, интересующихся нейробиологией и обладающих углубленными знаниями в области биологии и физики.",
  },
  {
    id: 5,
    img: standActive,
    logo: Logo,
    title: "Демонстрационный курс",
    subtitle: "Демонстрация возможностей платформы",
    description: "Используется уст-во с серийным номером 20A-004. Данное уст-во представялет собой стенд, оборудованный датчиками - измерителями расстояния.",
  },
  {
    id: 4,
    img: bitronicsImg,
    logo: bitronicsLogo,
    title: "Старт работы с учебной лабораторией по нейротехнологиям и физиологии человека",
    subtitle: "Управление роботом в виртуальной среде",
    description: "Данное событие предназначено для первичного ознакомления с управляемым виртуальным роботом и представляет собой демонстрацию базовых возможностей управления им как непосредственно, так и при помощи программного интерфейса. В рамках события на первой стадии участникам дается возможность совместно опробовать управление роботом с помощью клавиатуры.Далее в общем текстовом редакторе участникам предлагается написать простую пошаговую инструкцию для робота, которая сначала приведет его к красному кристаллу внутри тоннеля, а после - в исходную позицию.",
  },
];

const Product = props => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const classes = useStyles();
  const [size, setValues] = React.useState("");
  const handleChange = event => {
    setValues(event.target.value);
  };
  const [addSize, setAddSize] = React.useState(1);
  const handleChangeAddSize = event => {
    setAddSize(event.target.value);
  };

  const ws = useRef(null);

  //useEffect(() => {
  //      ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
  //      ws.current.binaryType = 'arraybuffer';
  //      ws.current.onclose = () => console.log("ws closed"); //devs - offline
  //      return () => {
  //          ws.current.close();
  //      };
  //}, []);

  

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Widget disableWidgetMenu noBodyPadding>
            <Grid container>
              <Grid item md={6} xs={12}>
                {!props.match.params.id ? (
                  <CardMedia
                    image={rows[0].img}
                    title={rows[0].title}
                    style={{ width: "100%", height: 600 }}
                  />
                ) : (
                  <CardMedia
                    image={rows[props.match.params.id - 1].img}
                    title={rows[props.match.params.id - 1].title}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <Box
                  m={3}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  style={{ height: "calc(100% - 48px)" }}
                >
                  {/*<Box>
                    {!props.match.params.id ? (
                      <div style={{ fontSize: "1.5rem", color: yellow[700] }}>
                        {rows[0].rating}
                        <StarIcon
                          style={{ color: yellow[700], marginTop: -5 }}
                        />
                      </div>
                    ) : (
                      <>
                        <Typography
                          style={{ color: yellow[700] }}
                          display={"inline"}
                        >
                          {rows[props.match.params.id - 1].rating}
                        </Typography>
                        <StarIcon
                          style={{ color: yellow[700], marginTop: -5 }}
                        />
                      </>
                    )}{" "}
                  </Box>*/}
                  <Box style={{ margin: "4%" }}>
                    {!props.match.params.id ? (
                      <>
                        <Typography variant="h3">
                          {rows[0].title}
                        </Typography>
                        <Typography>{rows[0].subtitle}</Typography>
                      </>
                    ) : (
                      <>
                          <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 16 }}>
                            {rows[props.match.params.id - 1].title}
                          </Typography>
                          {rows[props.match.params.id - 1].id == 2 &&
                            <Typography>
                              <div className={classes.contentText} style={{ maxWidth: 800 }}>
                                <p>После прохождения курса вы:</p>
                                <ul style={{ listStyleType: "disc" }}>
                                  <li>Узнаете о современных направлениях и концепциях в области нейронауки и их связи с развивающимися направлениями техники</li>
                                  <li>Познакомитесь с основными методами, использующимися для проведения исследований в нейроанатомии, нейрофизиологии и нейропсихологии</li>
                                  <li>Повысите свой уровень знаний по анатомии головного мозга, электрофизиологии и даже психологии</li>
                                  <li>Увидите основные эксперименты из разных областей нейробиологии и поймете принципы получения, обработки и интерпретации экспериментальных данных</li>
                                </ul>
                              </div>
                            </Typography>
                          }
                          {rows[props.match.params.id - 1].id == 4 &&
                            <Typography>
                              <div className={classes.contentText} style={{ maxWidth: 800 }}>
                                Онлайн-курс по работе с учебной лабораторией по нейротехнологиям для естественно-научного направления.
                              </div>
                            </Typography>
                          }
                      </>
                    )}{" "}
                  </Box>
                  {/*<Box>
                    {!props.match.params.id ? (
                      <>
                        <Typography weight="medium" variant={"h5"}>
                          Пройдено: {rows[0].progress}%
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography weight="medium">
                          Пройдено: {rows[props.match.params.id - 1].progress}%
                        </Typography>
                      </>
                    )}{" "}
                  </Box>*/}
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Button component={Link} href={`#/app/course/${rows[props.match.params.id - 1].id}`}
                      color="primary"
                      variant="contained"
                      style={{ width: "30%" }}
                    >
                      Перейти
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={8}>
          <Widget disableWidgetMenu title="">
            <Grid container>
              <Grid item xs={12}>
                <Grid container item spacing={3}>
                  <div style={{ margin: "3%" }}>
                    <Typography variant="h3" style={{ marginBottom: 16, fontWeight: "bold" }}>
                      Описание 
                    </Typography>
                    {rows[props.match.params.id - 1].id == 2 &&
                      <Typography>
                        <div className={classes.contentText} style={{ maxWidth: 1024 }}>
                          {/*rows[props.match.params.id - 1].description*/}
                          <p>Онлайн-школа рассчитана на учеников, интересующихся нейробиологией и обладающих углубленными знаниями в области биологии и физики.</p>
                          <p>Участники онлайн-школы по основам современных нейронаук получат теоретические и практические знания в области нейробиологии и психологии. Мы разберем основные термины и явления, необходимые для знакомства с этими сложными научными областями.</p>
                          <p>Материал курса освещает как ключевые теоретические вопросы нейробиологии, так и их практическое применение.</p>
                          <p>В 8 самостоятельных работах участники смогут на практике применить полученные знания, столкнувшись с исследовательскими задачами, которые решают ученые-нейробиологи. Практические работы предполагают работу с современным программным обеспечением и обучающими симуляторами.</p>
                          <p>Школа построена в виде 3-х модулей, в которых последовательно рассмотрены различные разделы нейробиологии: нейроанатомия, нейрофизиология и нейропсихология. Теоретический материал представлен по принципу от простого к сложному и позволяет пройти путь от строения отдельного нейрона к суммарной электрической активности мозга и таким психическим явлениям как восприятие и мышление.</p>
                        </div>
                      </Typography>
                    }
                    {rows[props.match.params.id - 1].id == 4 &&
                      <Typography>
                        <div className={classes.contentText} style={{ maxWidth: 800 }}>
                          <p>Курс посвящен:</p>
                          <ul style={{ listStyleType: "disc" }}>
                            <li>Первому подключению оборудования.</li>
                            <li>Работе в программе BiTronics Studio для визуализации и анализа регистрируемых сигналов.</li>
                            <li>Особенностям учебной программе на базе учебной лаборатории.</li>
                            <li>Примерам практических работ.</li>
                          </ul>
                          <p>Данный курс может быть полезен для преподавателей Детских технопарков “Кванториум” и Точек роста, а также для всех, кто только начинает работу с лабораторией и программным обеспечением BiTronics Studio.</p>
                        </div>
                      </Typography>
                    }
                  </div>
                  <Grid
                    item
                    container
                    direction={"column"}
                    justify={"space-between"}
                    md={4}
                    xs={12}
                  >
                    {/*<Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                          Используемые технологии
                      </Typography>
                      <p>{rows[props.match.params.id - 1].technology}</p>
                    </Box>*/}
                  </Grid>
                  {/*<Grid item container direction={"column"} md={4} xs={12}>
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        Поделиться
                      </Typography>
                      <p>
                        Поделиться с тэгом {" "}
                        <Link to="#" color="primary">
                          #eqvium
                        </Link>
                      </p>
                      <Box mb={1} ml={"-16px"}>
                        <IconButton aria-label="facebook">
                          <Icon
                            path={FacebookIcon}
                            size={1}
                            color="#6E6E6E99"
                          />
                        </IconButton>
                        <IconButton aria-label="instagram">
                          <Icon
                            path={InstagramIcon}
                            size={1}
                            color="#6E6E6E99"
                          />
                        </IconButton>
                        <IconButton aria-label="twitter">
                          <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        Рейтинг
                      </Typography>
                      {!props.match.params.id ? (
                        <div style={{ fontSize: "1.5rem", color: yellow[700] }}>
                          {rows[0].rating}
                          <StarIcon
                            style={{ color: yellow[700], marginTop: -5 }}
                          />
                        </div>
                      ) : (
                        <>
                          <Typography
                            style={{ color: yellow[700] }}
                            display={"inline"}
                          >
                            {rows[props.match.params.id - 1].rating}
                          </Typography>
                          <StarIcon
                            style={{ color: yellow[700], marginTop: -5 }}
                          />
                        </>
                      )}
                      <p>32 Отзыва</p>
                      <Link to="#" color="primary">
                        Читать отызвы
                      </Link>
                    </Box>
                  </Grid>*/}
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={4}>
          <Widget disableWidgetMenu title="">
            <div style={{ margin: "3%" }}>
              <Typography variant="h3" style={{ marginBottom: 16, fontWeight: "bold" }}>
                Организаторы
              </Typography>
              <img
                src={rows[props.match.params.id - 1].logo}
                style={{ width: "40%", alignContent: "center" }}
              />
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
