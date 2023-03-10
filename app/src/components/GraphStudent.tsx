import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";


export default function GraphStudent(props:any) {
    // const [dataGraph, setDataGraph] = useState<any>([])
    return (
      <View>
        <BarChart
        data={{
          labels: ['Present', 'Absent', 'Retard', 'Distanciel', ''],
          datasets: [
            {
              data : props.dataGraph,
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
          min: 0,
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