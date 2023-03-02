import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RouteProp, useRoute } from '@react-navigation/native';
import { getLogsByLogin, getLogsUser } from "../../services/logs/logs.services";
import CardStudent from "../components/CardStudent";
import SelectDropdown from 'react-native-select-dropdown'
import GraphStudent from "../components/GraphStudent";

interface RouteParams {
  propsToSend: {
    firstname: String;
    lastname:String;
    login:String
  };
}
type RootStackParamList = {
  Detail: RouteParams;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;


export default function StudentsAdminDetails() {
  const route = useRoute<DetailScreenRouteProp>();
  const props = route.params.propsToSend;
  const[data,setData] = useState<any>();
  const [dataGraph, setDataGraph] = React.useState<any>([]);


  const getLogs = async()=>{
    await getLogsUser(props.login).then((res)=> setData(res))
  }
  useEffect(()=>{
    getLogs()
    getGraph(props.login);
  

  },[])
  const getGraph= async(login:String) =>{
  await getLogsByLogin(login).then((res) => {
    const max = Number(res.data.Present) + Number(res.data.Absent) + Number(res.data.Retard) + Number(res.data.Distanciel)
      const even_max = () => {
        if (max % 2 == 0 ) {
          return max + 2
        } else {
          return max + 1
        }
      } 
      setDataGraph([res.data.Present, res.data.Absent, res.data.Retard, res.data.Distanciel, even_max()])
  });}

  return (
    <ScrollView>
      <View className="ml-5">
        <View className="flex flex-row gap-1 mt-5">
          <Text className="text-xl">{props.firstname}</Text>
          <Text className="text-xl">{props.lastname}</Text>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Historique d'assiduité de {props.login}</Text>
          <ScrollView>
            {data && data.map((items:any,i: Number)=>{
              
              return(
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
              )
            })}
          </ScrollView>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Présence</Text>
          {/* <View className="w-11/12 h-48 bg-slate-600 rounded-xl mt-2"></View> */}
          <GraphStudent dataGraph={dataGraph ? dataGraph : [0,0,0,0,0]}/>

        </View>
      </View>
    </ScrollView>
  );
}
