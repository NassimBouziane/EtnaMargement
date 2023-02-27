import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Button, Dimensions, View } from 'react-native';
import moment from 'moment-timezone';
import { getLogsByDate } from '../../services/logs/logs.services';

export default function GraphDay() {
  const [dataGraph, setDataGraph] = useState<any>()

  const setData = async() => {
    const date = moment().tz('Europe/Paris').format('YYYY-MM-DD');
    await getLogsByDate(date).then((res) => {
      setDataGraph([res.data.Absent, res.data.Distanciel, res.data.Present, res.data.Retard])
    })
  }
  useEffect(() => {
    setData()
  }, []);

  const chartData = {
    labels: ['Absent', 'Distanciel', 'Present', 'Retard' ],
    datasets: [
      {
        label: 'My First Dataset',
        data: dataGraph,
        backgroundColor: [
          'red',
          'purple',
          'green',
          'yellow'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <View>
    <WebView
      style={{ width: Dimensions.get('window').width - 16, height: 220 }}
      originWhitelist={['*']}
      source={{ html: `<html><body><canvas id="canvas"></canvas><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script><script>var ctx = document.getElementById('canvas').getContext('2d');new Chart(ctx, {type: 'doughnut', data: ${JSON.stringify(
        chartData,
      )}, options: {maintainAspectRatio: false, responsive: false}});</script></body></html>` }}
      javaScriptEnabled={true}
      scalesPageToFit={false}
    />
    </View>
  );
};