import React from "react";
import { Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <View className="mt-12 ml-5">
        <Text className="text-2xl mt-5">Paramètres</Text>
      </View>
    </View>
  );
}