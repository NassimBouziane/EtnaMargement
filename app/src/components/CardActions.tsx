import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

export default function CardActions(props: any) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="w-40 h-40 bg-green-200 mx-5 my-2 rounded-3xl" style={{}}>
      <Text className="text-2xl text-center mt-2">{props.title}</Text>
      <Image
        source={props.image}
        className=" mx-auto my-auto"
        style={{
          width: screenWidth < 768 ? "40%" : "100%",
          height: screenWidth < 768 ? "32%" : "100%",
        }}
      />
    </View>
  );
}
