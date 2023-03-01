import React from "react";
import { Image, Text, View } from "react-native";

export default function CardTicket(props: any) {
  return (
    <View className="bg-[#D9D9D9] w-[300px] rounded-2xl py-1 my-3">
      <View className="flex flex-row gap-1 py-3 ml-3 items-center w-full">
        <Image
          className="rounded-lg mr-3"
          source={{
            uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
          }}
          style={{ width: "20%", height: "100%" }}
        />
        <View className="flex flex-col mr-5">
          <Text className="font-bold mb-1">{props.name}</Text>
          <View className="flex flex-row justtify-evenly gap-3">
            <Text className="w-[100px]" numberOfLines={1}>
              {props.title}
            </Text>
            <Text>{props.time}</Text>
          </View>
          <Text className="italic ">{props.status}</Text>
        </View>
      </View>
    </View>
  );
}
