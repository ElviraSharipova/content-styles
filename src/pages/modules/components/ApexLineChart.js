import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";



export default function ApexLineChart(props) {
  var theme = useTheme();
  
  const options = {
    tooltip: {
      enabled: false
    },
    dataLabels : {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0,
    },
    markers: {
     size: 5,
     shape: "square",
     colors: ["#008FFB"]
    },
    xaxis : {
    tickAmount: 15,
    min: 0,
    max: 300,
    },
    yaxis : {
    min: 0,
    max: 140,
    },

    colors: [theme.palette.primary.main, theme.palette.success.main],
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  }
 
  const series = [
  {
    name: "row1",
    data: props.data
  }
  ];

  return (
    <ApexCharts
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
}



// ############################################################
function themeOptions(theme) {
  return {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
      width: 0,
    },
    markers: {
      size: 5,
          shape: "circle",
     colors: ["#008FFB"]
    },
    fill: {
      colors: [theme.palette.primary.light, theme.palette.success.light],
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
};
}

// ##################################################################


