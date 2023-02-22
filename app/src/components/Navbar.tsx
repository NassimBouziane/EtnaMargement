import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Navbar() {
  const navigation: any = useNavigation();
  return (
    <View className="flex justify-evenly gap-2 m-1 w-[20%] h-[90%] bg-[#5863F8] rounded-3xl">
      <Button title="Go scan" onPress={() => navigation.navigate("Scanner")} />
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
      <View className="w-[64px] h-[64px] bg-white border-black border-2"></View>
    </View>
  );
}
