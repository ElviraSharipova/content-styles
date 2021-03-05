import React from 'react';
import { Line } from 'react-chartjs-2';

const labels = [...Array(91).keys()]

function parseData(data) {
  var filteredData = [...data].sort(function (a, b) {
    return a[0] - b[0];
  });
  var parsedData = new Array(filteredData.length);
  for (var i = 0; i < filteredData.length; i++) {
    parsedData[i] = { x: filteredData[i][0], y: filteredData[i][1] };
  }
  return (
    parsedData
  );
}

export default function LineChart(props) {
  const options = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: props.axesLabels[1],
            fontSize: 18,
          }
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: props.axesLabels[0],
            fontSize: 18,
          }
        },
      ],
    },
    showLines: false,
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: parseData(props.data),
        //data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <Line data={data} options={options} />
  )
}
