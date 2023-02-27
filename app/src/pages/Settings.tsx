import React from "react";
import { Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <View className="flex flex-row h-full my-12 ">
      <Navbar />
      <Text>Settings Screen</Text>
    </View>
  );
}