import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function GraphWeek(props:any) {
  

  const [currentPage, setCurrentPage] = useState("");
  const navigation: any = useNavigation();
  const [graphWidth, setGraphWidth] = useState(25);

  useEffect(() => {
    setCurrentPage(
      navigation.getState().routes[navigation.getState().index].name
    );
    if (currentPage === "Home") {
      setGraphWidth(50);
    }
    [];
  });

  return (
    <LineChart
      data={{
        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
        datasets: [
          {
            data: props.presentData,
            color: () => "green",
          },
          {
            data: props.absentData,
            color: () => "red",
          },
          {
            data: props.retardData,
            color: () => "orange",
          },
          {
            data: props.distancielData,
            color: () => "purple",
          },
          {
            data: [100], // max
            withDots: false,
          },
          {
            data: [0], // min
            withDots: false,
          },
        ],
        legend: ["Prés", "Abs", "Ret", "Dist"],
      }}
      width={Dimensions.get("window").width - graphWidth}
      height={220}
      withShadow={false}
      withVerticalLines={false}
      chartConfig={{
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: () => `rgba(0, 0, 0, 0.5)`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        borderRadius: 16,
      }}
    />
  );
}
