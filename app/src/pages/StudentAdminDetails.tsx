import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getLogsByLogin, getLogsUser } from "../../services/logs/logs.services";
import CardStudent from "../components/CardStudent";
import SelectDropdown from "react-native-select-dropdown";
import GraphStudent from "../components/GraphStudent";
import { getNote, getPromo, getPromoByLogin } from "../../services/etna/etna.services";
import { getUserByLogin } from "../../services/users/users.services";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RouteParams {
  propsToSend: {
    firstname: String;
    lastname: String;
    login: String;
  };
}
type RootStackParamList = {
  Detail: RouteParams;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function StudentsAdminDetails() {
  const route = useRoute<DetailScreenRouteProp>();
  const props = route.params.propsToSend;
  const [data, setData] = useState<any>();
  const [dataGraph, setDataGraph] = React.useState<any>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [grades, setGrades] = React.useState<any>([
    ["Activity 1: ", "14/20"],
    ["Activity 2: ", "16/20"],
    ["Activity 3: ", "20/20"],
  ]);
  const navigation = useNavigation();
  const getLogs = async () => {
    await getLogsUser(props.login).then((res) => setData(res));
    
  };

  const getGrades = async () => {
    const token :any = await AsyncStorage.getItem("token");
    const user = await getUserByLogin(props.login, await JSON.parse(token));
    const promo = await getPromoByLogin(props.login, await JSON.parse(token));
    const grades = await getNote(
      await JSON.parse(token),
      user.login,
      promo[0].id.toString()
    ).then((res) => {
      // get 3 last grades and put grades.activity_name in grades[i][i] and  grades.grade in grades[i][i+1] like this ["Activity 1: ", "14/20"]
      res = res.slice(Math.max(res.length - 3, 1));
      let grades = [];
      for(let i = 0; i < res.length; i++){
        const mark = res[i].student_mark ? (res[i].student_mark + "/" + res[i].maximal) : "indisponible"
        grades.push(
          [res[i].activity_name+": ", mark]
        )
      }
      setGrades(grades);
    });
  }; 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // reload data
    getLogs()
    getGraph(props.login)
    getGrades()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    getLogs();
    getGraph(props.login);
    getGrades();
  }, []);
  const getGraph = async (login: String) => {
    await getLogsByLogin(login).then((res) => {
      const max =
        Number(res.data.Present) +
        Number(res.data.Absent) +
        Number(res.data.Retard) +
        Number(res.data.Distanciel);
      const even_max = (x: number) => {
        let y = Math.ceil(x / 4) * 4; // Round up x/4 and multiply by 4 to get closest multiple of 4
        if (y % 2 !== 0) {
          // If y is odd, add 2 to make it even
          y += 2;
        }
        return y;
      };
      setDataGraph([
        res.data.Present,
        res.data.Absent,
        res.data.Retard,
        res.data.Distanciel,
        even_max(max),
      ]);
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/logoEtna.png")}
            className=" ml-5 "
            style={{ width: 96, height: 30 }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View className="mx-auto w-[90%] h-full">
        <View className="flex flex-row items-center gap-1 mt-12 mb-10 mx-auto">
          <Image
            className="rounded-lg w-64 mr-3"
            source={{
              uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
            }}
            style={{
              width: "25%",
              height: "310%",
            }}
          />
          <Text className="text-xl">{props.firstname}</Text>
          <Text className="text-xl w-36" numberOfLines={1}>
            {props.lastname}
          </Text>
        </View>
        <View className="mt-5">
          <Text className="text-lg rounded-lg text-center mb-8 py-2 px-3 bg-[#363D97] color-white w-[100%] mx-auto">
            Historique d'assiduité de {props.login}
          </Text>
          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            {data &&
              data.map((items: any, i: Number) => {
                let notifColor = require("../../assets/notif_red.png")
                  let notifColor2 = require("../../assets/notif_red.png")

                  const color = () => {
                    if (items.morning == "Present") {
                      notifColor = require("../../assets/notif_green.png")
                    } else if (items.morning == "Retard") {
                      notifColor = require("../../assets/notif_yellow.png");
                    } if (items.afternoon == "Present") {
                      notifColor2 = require("../../assets/notif_green.png");
                    } else if (items.afternoon == "Retard") {
                      notifColor2 = require("../../assets/notif_yellow.png");
                    }
                  }

                  color()
                return (
                  <View key={items.id}>
                    <CardStudent
                      key={items.id}
                      id={items.id}
                      login={items.login}
                      morning={items.morning}
                      afternoon={items.afternoon}
                      firstname={items.firstname}
                      lastname={items.lastname}
                      date={items.date}
                      status={items.status}
                      notifColor2={notifColor2}
                      notifColor={notifColor}
                    />
                  </View>
                );
              })}
          </ScrollView>
        </View>
        <View className="mt-5">
          <Text className="text-lg rounded-lg text-center mb-8 py-2 px-3 bg-[#363D97] color-white w-[100%] mx-auto">
            Présence
          </Text>
          {/* <View className="w-11/12 h-48 bg-slate-600 rounded-xl mt-2"></View> */}
          <GraphStudent dataGraph={dataGraph ? dataGraph : [0, 0, 0, 0, 0]} />
        </View>
        <View className="flex h-[300px] w-[95%] mx-auto rounded-lg justify-center items-center">
          <Text className="text-lg w-[90%] rounded-lg text-center mb-6 py-2 px-3 bg-[#363D97] color-white">
            Dernières notes
          </Text>
          <View className="w-[90%] bg-[#D9D9D9] rounded-lg">
            {/* map grades and display them*/
            grades ? grades.map((grade, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-row w-full h-[50px] justify-between items-center"
                >
                  <View className="flex flex-row w-full h-fit">
                    <Text className="text-[11px] w-full text-center">
                      {grade}
                    </Text>
                  </View>
                </View>
              );
            }) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
