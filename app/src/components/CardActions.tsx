import React from "react";
import { Image, Text, View } from "react-native";

export default function CardActions(props: any) {
  return (
    <View className="w-40 h-40 bg-white mx-5 rounded-2xl">
      <Text className="text-2xl text-center mt-2">{props.title}</Text>
      <Image source={props.image} className=" mx-auto my-auto" />
    </View>
  );
}
