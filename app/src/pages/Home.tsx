import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import CardActions from "../components/CardActions";
import Navbar from "../components/Navbar";
import Ticket from "../components/Ticket";

export default function Home({ navigation }: any) {
  return (
    <View className="flex flex-row h-full my-12 ">
      <Navbar />
      <View className="flex w-4/5 h-[93%] left-6 bg-[#E3E3E3] rounded-3xl ">
        <Text className="mt-12 text-4xl mb-12 ml-10">Bonjour, Admin</Text>
        {/* <Button
          title="Go scan"
          onPress={() => navigation.navigate("Scanner")}
        /> */}
        <View className="flex flex-row justify-between">
          <View className="left-5">
            <Text className="text-3xl mb-5">Graphique journalier</Text>
            <View className="w-64 h-64 bg-slate-600 rounded-2xl"></View>
          </View>
          <View className="right-5">
            <Text className="text-3xl">Derniers tickets:</Text>
            <Ticket />
            <Ticket />
            <Ticket />
          </View>
        </View>
        <View className="mt-2">
          <View className="bg-pink  w-full">
            <Text className="text-3xl mb-5 ml-8">Graphique de la semaine</Text>
            <View className="w-11/12 h-64 bg-slate-600 rounded-2xl  mx-auto"></View>
          </View>
          <View className="flex flex-row w-ful justify-evenly mt-10">
            <Pressable onPress={() => navigation.navigate("Tickets")}>
              <CardActions
                title="Tickets"
                image={require("./../../assets/button_ticket.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Messages")}>
              <CardActions
                title="Messages"
                image={require("./../../assets/button_message.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Scanner")}>
              <CardActions
                title="Mode scan"
                image={require("./../../assets/button_scan.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
