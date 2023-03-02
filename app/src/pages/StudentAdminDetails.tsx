import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getLogsByLogin, getLogsUser } from "../../services/logs/logs.services";
import CardStudent from "../components/CardStudent";
import SelectDropdown from "react-native-select-dropdown";
import GraphStudent from "../components/GraphStudent";

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

  const getLogs = async () => {
    await getLogsUser(props.login).then((res) => setData(res));
  };
  useEffect(() => {
    getLogs();
    getGraph(props.login);
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <ScrollView>
            {data &&
              data.map((items: any, i: Number) => {
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
      </View>
    </ScrollView>
  );
}
