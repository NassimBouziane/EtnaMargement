import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Ticketlarge from "../components/TicketLarge";
import { RouteProp, useRoute } from '@react-navigation/native';
interface RouteParams {
  propsToSend: {
    firstname: String;
    lastname:String
  };
}
type RootStackParamList = {
  Detail: RouteParams;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;


export default function StudentsAdminDetails() {
  const route = useRoute<DetailScreenRouteProp>();
  const props = route.params.propsToSend;
  useEffect(()=>{

    
   

  },[])

  return (
    <View>
      <View className="ml-5">
        <View className="flex flex-row gap-1 mt-5">
          <Text className="text-xl">{props.firstname}</Text>
          <Text className="text-xl">{props.lastname}</Text>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Tickets</Text>
          <ScrollView>
          </ScrollView>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Présence</Text>
          <View className="w-11/12 h-48 bg-slate-600 rounded-xl mt-2"></View>
        </View>
      </View>
    </View>
  );
}
