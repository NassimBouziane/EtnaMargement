import React from "react";
import { Text, View } from "react-native";
import Ticketlarge from "../components/TicketLarge";

export default function StudentsAdminDetails(props: any) {
  return (
    <View>
      <View className="ml-5">
        <View className="flex flex-row gap-1 mt-5">
          <Text className="text-xl">Mosbah</Text>
          <Text className="text-xl">caca</Text>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Tickets</Text>
          <View>
            <Ticketlarge />
            <Ticketlarge />
            <Ticketlarge />
          </View>
        </View>
        <View className="mt-5">
          <Text className="text-xl">Présence</Text>
          <View className="w-11/12 h-48 bg-slate-600 rounded-xl mt-2"></View>
        </View>
      </View>
    </View>
  );
}
