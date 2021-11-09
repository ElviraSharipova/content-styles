import React from "react";
import { useTheme } from "@mui/styles";
import ApexCharts from "react-apexcharts";


export default function ApexLineChart(props) {
  var theme = useTheme();

  const series2 = [
  {
    name: "сенсор1",
    data: [props.data[0]]
  },
  {
    name: "сенсор2",
    data: [props.data[1]]
  },
  {
    name: "сенсор3",
    data: [props.data[2]]
  },
  {
    name: "сенсор4",
    data: [props.data[3]]
  },
  {
    name: "сенсор5",
    data: [props.data[4]]
  },
{
    name: "сенсор6",
    data: [props.data[5]]
  },
  {
    name: "сенсор7",
    data: [props.data[6]]
  },
  {
    name: "сенсор8",
    data: [props.data[7]]
  },
  ];

  const options2 = {
    chart: {
      toolbar: {
        show: false,
      },
    },
   xaxis : {
      labels: {
        show : false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
  }
  //console.log(props.data[0])
  return (
    <ApexCharts
      options={options2}
      series={series2}
      type="heatmap"
      height={350}
    />
  );
}

// ##################################################################
function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = "w" + (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }

  return series;
}

function themeOptions(theme) {
  return {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis : {
      labels: {
        show : false,
      },
    }, 
    colors: ["#008FFB"],
  };
}
