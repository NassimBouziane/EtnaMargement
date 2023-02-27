import { BarCodeScanner } from "expo-barcode-scanner";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Messages() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
    </View>
  );
}
