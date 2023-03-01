import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function CardStudent(props: any) {
  const navigation: any = useNavigation();

  return (
    <View className="bg-[#D9D9D9] rounded-2xl my-2">
      <Pressable onPress={() => navigation.navigate("Detail")}>
        <View className="flex flex-row gap-1 py-5 ml-3 items-center">
          <Image
            className="rounded-lg w-64"
            source={{
              uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
            }}
            style={{ width: "8%", height: "100%" }}
          />
          <Text className="pl-2">{props.firstname}</Text>
          <Text>{props.lastname}</Text>
          <Text>-</Text>
          <Text>{props.morning}</Text>
          <Text>{props.afternoon}</Text>

          {/* <Text className="text-gray-500">({props.login})</Text> */}
        </View>
      </Pressable>
    </View>
  );
}
