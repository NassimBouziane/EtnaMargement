import React from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import moment from "moment";
import "moment/locale/fr";

export default function Scanner({ navigation }: any) {
  moment.locale(); // fr
  const date = moment().format("LT");
  return (
    <View className="mt-16">
      <View className="flex flex-row justify-between items-center">
        <Image
          source={require("../../assets/logoEtna.png")}
          className=" ml-5 "
          style={{ width: 96, height: 30 }}
        />
        <Pressable
          className="mr-5 pl-5 pr-5 pt-2 pb-2 bg-[#5863F8] rounded-2xl"
          onPress={() => navigation.navigate("")}
        >
          <Text className="text-lg text-white">Connexion</Text>
        </Pressable>
      </View>
      <Text className="mt-48 text-center text-4xl">{date}</Text>
    </View>
  );
}
