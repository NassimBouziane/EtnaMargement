import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function CardStudent(props: any) {
  const navigation: any = useNavigation();

  return (
    <View className="bg-[#D9D9D9] rounded-2xl my-3">
      <Pressable onPress={() => navigation.navigate("Detail")}>
        <View className="flex flex-row gap-1 py-3 ml-3 items-center">
          <Image source={require("../../assets/test-pfp.png")} />
          <Text className="pl-2">{props.fistname}</Text>
          <Text>{props.lastname}</Text>
          <Text className="text-gray-500">({props.login})</Text>
        </View>
      </Pressable>
    </View>
  );
}
