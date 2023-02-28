import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

export default function Ticketlarge() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      className="flex w-auto flex-row justify-around bg-gray-200 rounded-3xl py-5 my-2 px-10 items-center"
      style={{
        width: screenWidth < 768 ? "95%" : "auto",
        paddingTop: screenWidth < 768 ? 5 : 10,
        paddingBottom: screenWidth < 768 ? 5 : 10,
      }}
    >
      <View>
        <Image source={require("../../assets/test-pfp.png")} className="" />
        <Image
          source={require("../../assets/round2.png")}
          className="top-0 absolute"
        />
      </View>
      <View className="flex flew-row items-start ml-10">
        <View className="flex flex-col">
          <Text
            className="text-3xl"
            style={{
              fontSize: screenWidth < 768 ? 20 : 32,
            }}
          >
            Paul Menut
          </Text>
          <Text
            className="text-2xl text-gray-700"
            style={{
              fontSize: screenWidth < 768 ? 16 : 32,
            }}
          >
            Train retardé à 8h52
          </Text>
        </View>
      </View>
      {/* <Image
        source={require("../../assets/circle1.png")}
        className="ml-20 w-[5%] h-[20%]"
      /> */}
    </View>
  );
}