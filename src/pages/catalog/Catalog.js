import React from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Link
} from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";
import Checkbox from '@material-ui/core/Checkbox';
import { yellow } from "@material-ui/core/colors/index";
import useStyles from "./styles";

//components
import { Typography, Chip, Button } from "../../components/Wrappers";

//products array
import { rows } from "./mock";

const Catalog = props => {
  const typeRef = React.useRef(null);
  const brandsRef = React.useRef(null);
  const sizeRef = React.useRef(null);
  const colourRef = React.useRef(null);
  const rangeRef = React.useRef(null);
  const sortRef = React.useRef(null);

  const widthReducer = (state, action) => {
    switch (action.type) {
      case "TYPE":
        return {
          ...state,
          type: action.typeWidth
        };
      case "BRANDS":
        return {
          ...state,
          brands: action.brandsWidth
        };
      case "SIZE":
        return {
          ...state,
          size: action.sizeWidth
        };
      case "COLOUR":
        return {
          ...state,
          colour: action.colourWidth
        };
      case "RANGE":
        return {
          ...state,
          range: action.rangeWidth
        };
      case "SORT":
        return {
          ...state,
          sort: action.sortWidth
        };
      default:
        return {
          ...state
        };
    }
  };

  const [width, setWidth] = React.useReducer(widthReducer, {
    type: 0,
    brands: 0,
    size: 0,
    colour: 0,
    range: 0,
    sort: 0
  });
  //React.useEffect(() => {
  //  setWidth({ type: "BRANDS", brandsWidth: brandsRef.current.offsetWidth });
  //}, []);
  const classes = useStyles();

  const selectReducer = (state, action) => {
    switch (action.type) {
      case "SELECT_TYPE":
        return {
          ...state,
          valueType: action.valueType
        };
      case "SELECT_BRANDS":
        return {
          ...state,
          valueBrands: action.valueBrands
        };
      case "SELECT_SIZE":
        return {
          ...state,
          valueSize: action.valueSize
        };
      case "SELECT_COLOUR":
        return {
          ...state,
          valueColor: action.valueColor
        };
      case "SELECT_RANGE":
        return {
          ...state,
          valueRange: action.valueRange
        };
      case "SELECT_SORT":
        return {
          ...state,
          valueSort: action.valueSort
        };
      default:
        return {
          ...state
        };
    }
  };

  const [state, dispatch] = React.useReducer(selectReducer, {
    valueType: "Shoes",
    valueBrands: "All",
    valueSize: 7,
    valueColour: "All",
    valueRange: "All",
    valueSort: "Favorite"
  });

  const [checkedCourses, setCheckedCourses] = React.useState(true);
  const [checkedEvents, setCheckedEvents] = React.useState(true);

  const handleChangeCourses = (event) => {
    setCheckedCourses(event.target.checked);
  };
  const handleChangeEvents = (event) => {
    setCheckedEvents(event.target.checked);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Grid container spacing={3}>
        {/*<Grid item xs={12} md={8}>
          <Box display="flex" style={{ marginLeft: "2%" }}>
            <FormControl
              variant="outlined"
              className={classes.form}
            >
              <InputLabel htmlFor="brands_select" ref={brandsRef}>
                Темы
              </InputLabel>
              <Select
                value={state.valueBrands}
                onChange={e =>
                  dispatch({
                    type: "SELECT_BRAND",
                    valueBrands: e.target.value
                  })
                }
                labelWidth={width.brands}
                inputProps={{
                  name: "brands",
                  id: "brands_select"
                }}
              >
                <MenuItem value={"All"}>Все темы</MenuItem>
                <MenuItem value={"Nike"}>Искуственный инеллект</MenuItem>
                <MenuItem value={"Adidas"}>Программирование</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={1}>
          <Button variant="contained" size="large" fullWidth={true} style={{ marginTop: 12 }} disabled><span style={{ color: "white" }}>Создать</span></Button>
        </Grid>
        <Grid item xs={12} md={1}></Grid>*/}
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
          {/*<Button variant="contained" size="large" fullWidth={false} style={{ right: "10%" }} disabled><span style={{ color: "white" }}>Создать</span></Button>*/}
        </div>
        <Grid item xs={12} style={{ marginTop: 30 }}>
          <Box display={"flex"} flexWrap={"wrap"}>
            <Grid container item spacing={3}>
              {rows.filter(c => checkedCourses && c.type === "Course" || checkedEvents && c.type === "Event").map(c => (
                <Grid item xs={12} md={3} key={c.id}>
                  <Card className={classes.card}>
                    <CardActionArea className={c.active ? (classes.cardLink) : (classes.cardLinkDisabled)} component={Link} href={`/#/app/catalog/product/${c.id}`} disabled={!c.active} style={{ textDecoration: "none" }}>
                      <CardMedia
                        className={classes.media}
                        image={c.img}
                        title={c.title}
                        style={{ maxHeight: "15vw" }}
                      >
                        {c.type === "Course" ? (
                          <Chip label={"Курс"} color={"success"} />
                        ) : (
                          <Chip label={"Событие"} color={"secondary"} />
                        )}
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {c.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text"
                          colorBrightness={"secondary"}
                          component="p"
                        >
                          {c.subtitle}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {/*<CardActions style={{ padding: 16 }}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems="center"
                        width={"100%"}
                      >
                        <Typography block>
                          <div style={{ color: yellow[700] }}>
                            {rows[0].rating}
                            <StarIcon
                              style={{ color: yellow[700], marginTop: -5 }}
                            />
                          </div>
                        </Typography>
                      </Box>
                    </CardActions>*/}
                  </Card>
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
