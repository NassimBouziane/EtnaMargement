import React from "react";
import { Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Messages() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <Text>Messages Screen</Text>
    </View>
  );
}