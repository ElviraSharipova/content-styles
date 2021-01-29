import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import ImageMapper from 'react-image-mapper';
import {
  Paper,
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  TableHead,
  TableSortLabel,
  Toolbar,
  IconButton, Menu
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Tooltip
} from "recharts";

import Image from '../../images/adrian-marc-amarc-cyberoom-v3.svg';
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import { Chip, Typography, Avatar } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon, MoreVert as MoreIcon,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { lighten } from "@material-ui/core/styles";
import cn from "classnames";

const MAP = {
  name: "my-map",
  areas: [
    { name: "2", shape: "poly", coords: [1412.242,540.188, 1317.25,532.495, 1325.874,482.188, 1420.25,487.682], fillColor: "yellow"  },
    
  ]
};


const styles = {
    paperContainer: {
        width: "100vh",
        height: "100vh",
        backgroundImage: `url(${Image})`
    }
};

var sectionStyle = {
    height: `calc(100vh + 58px)`,
    display: "flex",
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw + 58px)`,
    margin: -38,
    padding: 48
};

var sectionStyleArea = {
    height: `calc(100vh + 58px)`,
    display: "flex",
    backgroundPosition: 'center',
    width: `calc(100vw + 58px)`,
    margin: -38,
    padding: 48
};

const stylesMy = {
     width: `calc(100vw + 58px)`,
     margin: -38,
     padding: 48,
  };

const Cabinet = props => {
  var classes = useStyles();
  var theme = useTheme();



  return (

<div style={{ width: '110%', border: '1px solid black', height: '110%', margin: '-5% -5% 0 -5%', overflow: 'hidden' }}>
<ImageMapper src={Image} map={MAP} style={{ maxWidth: '100%'}} onClick={ area => props.history.push("/app/module/1")}
    />
    </div>  
  );

}

export default withRouter(Cabinet);
