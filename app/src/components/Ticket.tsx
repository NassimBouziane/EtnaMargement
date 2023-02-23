import React from "react";
import { Image, Text, View } from "react-native";

export default function Ticket() {
  return (
    <View className="flex flex-row w-auto px-5 py-2 rounded-2xl h-auto my-2 items-center bg-white">
      <Image source={require("../../assets/test-pfp.png")} />
      <View className="flex ml-10">
        <Text className="text-3xl">Menut Paul</Text>
        <View className="flex ">
          <Text className="text-2xl">Train Retardé</Text>
          <Text className="text-2xl">à 9:02</Text>
        </View>
      </View>
      {/* <Image source={require("../../assets/circle1.png")} /> */}
    </View>
  );
}
