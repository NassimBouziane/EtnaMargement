import React from "react";
import { Text, View } from "react-native";

export default function CardHome(props: any): JSX.Element {
  return (
    <View className="p-4 rounded-lg w-36 h-36 shadow-sm bg-[#EFE9F4]">
      <Text className="mb-4 text-xl text-center text-black" text-black>
        {props.title}
      </Text>
      <Text className=" mb-10  text-center">(Svg)</Text>
      <Text className=" bottom-2 text-right bg-EFE9F4 text-black">
        Voir plus →
      </Text>
    </View>
  );
}
