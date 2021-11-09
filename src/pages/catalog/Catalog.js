import React, { useEffect } from "react";
import {
  Grid,
  Box,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import useStyles from "./styles";
import { useTheme } from "@mui/styles";
import styled from "styled-components/macro";

//components
import { Typography, Chip as MuiChip } from "../../components/Wrappers";

//products array
//import { rows } from "./mock";
import axios from "axios";

import CatalogItem from "./CatalogItem";

const Catalog = props => {
  const classes = useStyles();
  const theme = useTheme()

  const [rows, setRows] = React.useState(null)

  const [checkedCourses, setCheckedCourses] = React.useState(true);
  const [checkedEvents, setCheckedEvents] = React.useState(true);

  const handleChangeCourses = (event) => {
    setCheckedCourses(event.target.checked);
  };
  const handleChangeEvents = (event) => {
    setCheckedEvents(event.target.checked);
  };

  const Chip = styled(MuiChip)`
    height: 20px;
    padding: 4px 0;
    font-size: 85%;
    background-color: ${theme.palette[props.color ? props.color : "primary"].light};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(4)};
  `;

  useEffect(() => {
    const ref_token = localStorage.getItem("token_ref");
    axios.post("/token/refresh/", { "refresh": ref_token }).then(res => {
      const token = res.data.access;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.get(`/content/courses/previews/`).then(res => {
        setRows(res.data.sort((a, b) => a.rating < b.rating ? 1 : -1));
        console.log(res.data.sort((a, b) => a.rating < b.rating ? 1 : -1))
      })
    })
  }, []);

  if (!rows) return (<></>)

  return (
    <div style={{ marginTop: 30 }}>
      <Grid container spacing={3}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", flexGrow: 1 }}>
            <Checkbox
              checked={checkedCourses}
              onChange={handleChangeCourses}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
              style={{ marginLeft: "2%" }}
            />
            <Typography gutterBottom variant="h5" component="h2" style={{ marginTop: 7 }}>
              Курсы
            </Typography>
            <Checkbox
              checked={checkedEvents}
              onChange={handleChangeEvents}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
              style={{ marginLeft: "2%" }}
            />
            <Typography gutterBottom variant="h5" component="h2" style={{ marginTop: 7 }}>
              События
            </Typography>
          </div>
        </div>
        <Grid item xs={12} style={{ marginTop: 30 }}>
          <Box display={"flex"} flexWrap={"wrap"}>
            <Grid container item spacing={3}>
              {rows.filter(c => checkedCourses && c.type === "Course" || checkedEvents && c.type === "Event").map(c => (
                <Grid item xs={12} lg={6} xl={3} key={c.id}>
                  <CatalogItem
                    id={c.id}
                    active={c.active}
                    title={c.title}
                    description={c.description}
                    image={c.img}
                    chip={c.type === "Course" ? (
                          <Chip label={"Курс"} color={"success"} />
                        ) : (
                          <Chip label={"Событие"} color={"secondary"} />
                        )}
                    disabled={!c.active}
                    presets={JSON.parse(c.presets)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;
