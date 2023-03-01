import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

export default function CardActions(props: any) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="w-24 h-24 bg-[#D9D9D9] mx-5 my-5 rounded-3xl" style={{}}>
      <Text className="text-lg text-center mt-1">{props.title}</Text>
      <Image source={props.image} className=" mx-auto my-auto mt-3 w-8 h-8" />
    </View>
  );
}
