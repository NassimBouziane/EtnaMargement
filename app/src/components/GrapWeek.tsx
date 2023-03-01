import { useNavigation, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getLogsByDate } from "../../services/logs/logs.services";

export default function GraphWeek() {
  const [retardData, setRetardData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [absentData, setAbsentData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [presentData, setPresentData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [distancielData, setDistancielData] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);
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

  const setData = async () => {
    for (let i = 1; i < 6; i++) {
      const now = moment();
      const weekNumber = now.isoWeek();
      const day = moment().isoWeekday(i);
      await getLogsByDate(day.toISOString().substring(0, 10)).then((res) => {
        setRetardData((prevData) => {
          const newData = [...prevData]; // Crée une copie du tableau précédent
          newData[i - 1] = res.data.Retard; // Modifie la valeur à l'indice i avec les nouvelles données
          return newData; // Renvoie le nouveau tableau pour mettre à jour l'état
        });
        setAbsentData((prevData) => {
          // Même principe pour les autres tableaux de données
          const newData = [...prevData];
          newData[i - 1] = res.data.Absent;
          return newData;
        });
        setPresentData((prevData) => {
          const newData = [...prevData];
          newData[i - 1] = res.data.Present;
          return newData;
        });
        setDistancielData((prevData) => {
          const newData = [...prevData];
          newData[i - 1] = res.data.Distanciel;
          return newData;
        });
      });
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <LineChart
      data={{
        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
        datasets: [
          {
            data: presentData,
            color: () => "green",
          },
          {
            data: absentData,
            color: () => "red",
          },
          {
            data: retardData,
            color: () => "orange",
          },
          {
            data: distancielData,
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
