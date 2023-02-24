import React from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

export default function GraphDay() {
  const chartData = {
    labels: ['Absent', 'Distanciel', 'Retard', 'Present'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [3, 1, 10, 80],
        backgroundColor: [
          'red',
          'purple',
          'yellow',
          'green'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <WebView
      style={{ width: Dimensions.get('window').width - 16, height: 220 }}
      originWhitelist={['*']}
      source={{ html: `<html><body><canvas id="canvas"></canvas><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script><script>var ctx = document.getElementById('canvas').getContext('2d');new Chart(ctx, {type: 'doughnut', data: ${JSON.stringify(
        chartData,
      )}, options: {maintainAspectRatio: false, responsive: false}});</script></body></html>` }}
      javaScriptEnabled={true}
      scalesPageToFit={false}
    />
  );
};