import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getLogsByLogin } from "../../services/logs/logs.services";


export default function GraphStudent(props) {
    const [dataGraph, setDataGraph] = useState<any>([])

    const setData = async() => {
        await getLogsByLogin(props.login).then((res) => {
        const max = Number(res.data.Present) + Number(res.data.Absent) + Number(res.data.Retard) + Number(res.data.Distanciel)
        setDataGraph([res.data.Present, res.data.Absent, res.data.Retard, res.data.Distanciel, max])
        })
    }
    useEffect( () => {
        setData()
    }, []);

    return (
      <View>
        <Text>Contribution Graph</Text>
        <BarChart
        data={{
          labels: ['Present', 'Absent', 'Retard', 'Distanciel', ''],
          datasets: [
            {
              data :dataGraph,
              colors: [
                    (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    (opacity = 1) => `rgba(0, 0, 70, ${opacity})`,
                    (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    (opacity = 0.1) => `rgba(255,255,255,${opacity})`
                ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 100}
        height={250}
        fromZero={true}
        
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(0, 0, 500, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          max: 100,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withCustomBarColorFromData={true}
        flatColor={true}
        showBarTops={false}
      />
      </View>
    );
  };