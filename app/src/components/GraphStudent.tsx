import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getLogsByLogin } from "../../services/logs/logs.services";


export default function GraphStudent(props) {
    const [dataGraph, setDataGraph] = useState<any>([])
    const setData = async() => {
        await getLogsByLogin(props.login).then((res) => {
        const max = Number(res.data.Present) + Number(res.data.Absent) + Number(res.data.Retard) + Number(res.data.Distanciel)
        const even_max = () => {
          if (max % 2 == 0 ) {
            return max + 2
          } else {
            return max + 1
          }
        } 
        setDataGraph([res.data.Present, res.data.Absent, res.data.Retard, res.data.Distanciel, even_max()])
        })
    }
    useEffect( () => {
        setData()
    }, []);

    return (
      <View>
        <BarChart
        data={{
          labels: ['Present', 'Absent', 'Retard', 'Distanciel', ''],
          datasets: [
            {
              data :dataGraph,
              colors: [
                    (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                    (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    (opacity = 1) => `rgba(255, 128, 0, ${opacity})`,
                    (opacity = 1) => `rgba(207, 160, 233, ${opacity})`,
                    (opacity = 0.1) => `rgba(227,227,227,${opacity})`
                ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 25}
        height={250}
        fromZero={true}
        
        chartConfig={{
          backgroundColor: '#E3E3E3',
          backgroundGradientFrom: '#E3E3E3',
          backgroundGradientTo: '#E3E3E3',
          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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