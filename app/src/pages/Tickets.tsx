import React from "react";
import { Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Tickets() {
  return (
    <View className="flex flex-row h-full my-12 ">
      <Navbar />

      <Text>Tickets Screen</Text>
    </View>
  );
}