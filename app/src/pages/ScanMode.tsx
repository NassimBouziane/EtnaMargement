import React from "react";
import { Text, View } from "react-native";
import Excel from "../components/Excel";
import Navbar from "../components/Navbar";

export default function ScanMode() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <Text>ScanMode Screen</Text>
      <Excel date="2023-02-28"/>
    </View>
  );
}