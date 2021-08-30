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
import standActive from "../../images/stand_preview.jpg";
import standInactive from "../../images/stand_inactive.png";
import Logo from '../../images/bfu-logo.png';
import bfuImg from "../../images/bfu_background.jpg";
import bitronicsImg from "../../images/bitronics_background.png";
import bitronicsLogo from "../../images/bitronics.png";

//import { rows } from "./mock";
import axios from "axios";

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

  //const ws = useRef(null);

  //useEffect(() => {
  //      ws.current = new WebSocket("ws://79.143.25.41:8080/gear");
  //      ws.current.binaryType = 'arraybuffer';
  //      ws.current.onclose = () => console.log("ws closed"); //devs - offline
  //      return () => {
  //          ws.current.close();
  //      };
  //}, []);

  const [content, setContent] = useState(null)

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/courses/${props.match.params.id}/preview/`).then(res => {
        let data = res.data
        data.presets = JSON.parse(res.data.presets)
        setContent(data);
      })
    })
  }, []);

  if (!content) return (<></>)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Widget disableWidgetMenu noBodyPadding>
            <Grid container>
              <Grid item md={6} xs={12}>
                <CardMedia
                  image={content.img}
                  title={content.title}
                  style={{ width: "100%", height: "100%" }}
                />
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
                      <>
                        <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: 16 }}>
                          {content.title}
                        </Typography>
                        <Typography>
                          <div className={classes.contentText} style={{ maxWidth: 800 }} dangerouslySetInnerHTML={{ __html: content.presets.subtitle }}></div>
                        </Typography>
                      </>
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
                    <Button component={Link} href={`#/app/course/${content.id}`}
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
                    <Typography>
                      <div className={classes.contentText} style={{ maxWidth: 800 }} dangerouslySetInnerHTML={{ __html: content.presets.description }}></div>
                    </Typography>
                  </div>
                  <Grid
                    item
                    container
                    direction={"column"}
                    justify={"space-between"}
                    md={4}
                    xs={12}
                  >
                  </Grid>
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
              <a href={content.presets.orgLink}>
                <img
                  src={content.presets.logo}
                  style={{ width: "40%", alignContent: "center" }}
                />
              </a>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
