import React from 'react';
import { Bar } from 'react-chartjs-2';

function parseData(data) {
  var parsedData = new Array(6);
  for (var i = 0; i < 6; i++) {
    parsedData[i] = data[i][1];
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
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        data: parseData(props.data),
        //data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <Bar data={data} options={options} />
  )
}
