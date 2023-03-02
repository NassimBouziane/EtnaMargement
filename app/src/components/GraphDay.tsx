import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

export default function GraphDay(props:any) {

  const chartData = {
    labels: ["Absent", "Distanciel", "Present", "Retard"],
    datasets: [
      {
        label: "My First Dataset",
        data: props.dataGraphDay,
        backgroundColor: ["red", "purple", "green", "yellow"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <WebView
      className="flex "
      style={{
        width: 1000,
        height: 220,
        backgroundColor: "transparent",
        marginTop: 5,
      }}
      originWhitelist={["*"]}
      source={{
        html: `<html><body><canvas id="canvas"></canvas><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script><script>var ctx = document.getElementById('canvas').getContext('2d');new Chart(ctx, {type: 'doughnut', data: ${JSON.stringify(
          chartData
        )}, options: {maintainAspectRatio: false, responsive: false, "legend": {
      "display": true,
      "fullWidth": true,
      "position": "bottom"
    },}});</script></body></html>`,
      }}
      javaScriptEnabled={true}
      scalesPageToFit={false}
    />
  );
};