import React from "react";
import { Image, Text, View } from "react-native";

export default function CardTicket(props: any) {
  return (
    <View className="bg-[#D9D9D9] rounded-2xl my-3">
      <View className="flex flex-row gap-1 py-3 ml-3 items-center">
        <Image
          className="rounded-lg w-64"
          source={{
            uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
          }}
          style={{ width: "20%", height: "100%" }}
        />
        <View className="flex flex-col">
          <Text className="font-bold text-center">{props.name}</Text>
          <View className="flex flex-col">
            <View className="flex flex-row">
              <Text className="w-[110px]" numberOfLines={1}>
                {props.title}
              </Text>
              <Text>{props.time}</Text>
            </View>
            <Text className="italic text-right">{props.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
