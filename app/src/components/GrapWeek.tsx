import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function GraphWeek() {
	const retardData = [3, 10, 6, 15, 50]
	const absentData = [0, 2, 4, 3, 0]
	const presentData = [97, 88, 90, 85, 50]
	const distancielData = [0,0,0,0,0]

  return (
    <LineChart
          data={{
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [
              {
                data: presentData,
								color: () => 'green'
              },
              {
                data: absentData,
								color: () => 'red'
              },
							{
                data: retardData,
								color: () => 'orange'
							},
							{
								data: distancielData,
								color: () => 'purple'
							},
							{
								data: [100], // max
								withDots: false,
							},
							{
								data: [0], // min
								withDots: false,
							}
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
					withShadow={false}
					withVerticalLines={false}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0,
            color: () => `rgba(0, 0, 0, 0.5)`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
  );
};
