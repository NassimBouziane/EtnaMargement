import React from "react";
import { Text, View } from "react-native";
import Excel from "../components/Excel";
import GraphStudent from "../components/GraphStudent";
import Navbar from "../components/Navbar";

export default function ScanMode() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <GraphStudent login='boular_t'/>
    </View>
  );
}