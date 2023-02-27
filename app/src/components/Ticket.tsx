import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

export default function Ticket() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      className="flex flex-row w-auto px-5 py-2 rounded-2xl h-auto my-2 items-center bg-white"
      style={{
        backgroundColor: screenWidth < 768 ? "#E3E3E3" : "white",
      }}
    >
      <Image source={require("../../assets/test-pfp.png")} />
      <View
        className="flex ml-10"
        style={{
          marginLeft: screenWidth < 768 ? "4%" : "8%",
        }}
      >
        <Text
          className="text-3xl"
          style={{
            fontSize: screenWidth < 768 ? 20 : 32,
            marginTop: screenWidth < 768 ? "5%" : "8%",
          }}
        >
          Menut Paul
        </Text>
        <View className="flex">
          <Text
            className="text-2xl"
            style={{
              fontSize: screenWidth < 768 ? 16 : 32,
            }}
          >
            Train Retardé à 9:02
          </Text>
        </View>
      </View>
      <Image
        source={require("../../assets/circle1.png")}
        style={{
          width: screenWidth < 768 ? "8%" : "50%",
          height: screenWidth < 768 ? "26%" : "50%",
          marginLeft: screenWidth < 768 ? "5%" : "10%",
        }}
      />
    </View>
  );
}
