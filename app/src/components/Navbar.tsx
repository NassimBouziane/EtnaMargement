import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";

export default function Navbar() {
  const navigation: any = useNavigation();

  const logOut = () => {
    AsyncStorage.removeItem('token')
  }

  return (
    <View className="flex justify-evenly items-center gap-2 w-[18%] h-[90%] bg-[#5863F8] rounded-3xl">
      {/* <Button title="Go scan" onPress={() => navigation.navigate("Scanner")} /> */}
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => navigation.navigate("Home")}>
          <Image source={require("../../assets/nav_home.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent ">
        <Pressable className="" onPress={() => navigation.navigate("Tickets")}>
          <Image source={require("../../assets/nav_tickets.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => navigation.navigate("Messages")}>
          <Image source={require("../../assets/nav_message.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => navigation.navigate("Students")}>
          <Image source={require("../../assets/nav_student.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => navigation.navigate("Logs")}>
          <Image source={require("../../assets/nav_logs.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => navigation.navigate("Settings")}>
          <Image source={require("../../assets/nav_parameters.png")} />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable className="" onPress={() => {
          navigation.navigate("Login")
          logOut()
          }}>
          <Image source={require("../../assets/nav_disconnect.png")} />
        </Pressable>
      </View>
    </View>
  );
}
