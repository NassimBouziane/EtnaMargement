import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { updatelogs } from "../../services/logs/logs.services";


export default function CardStudent(props: any) {
  const status = ["Justifié", "Non Justifié", "En Attente"]

  const navigation: any = useNavigation();
  let notifColor: any = require("../../assets/notif_red.png");
  if (props.morning == "Present") {
    notifColor = require("../../assets/notif_green.png");
  } else if (props.morning == "Retard") {
    notifColor = require("../../assets/notif_yellow.png");
  }
  let notifColor2: any = require("../../assets/notif_red.png");
  if (props.afternoon == "Present") {
    notifColor2 = require("../../assets/notif_green.png");
  } else if (props.morning == "Retard") {
    notifColor2 = require("../../assets/notif_yellow.png");
  }

  return (
    <View className="bg-[#D9D9D9] w-[300px] rounded-xl my-2">
      <Pressable
        onPress={() =>
          navigation.navigate("Detail", {
            propsToSend: {
              firstname: props.firstname,
              lastname: props.lastname,
              login: props.login,
            },
          })
        }
      >
        <View className="flex flex-row gap-1 py-5 ml-3 items-center">
          <Image
            className="rounded-lg w-64"
            source={{
              uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
            }}
            style={{ width: "20%",  height: props.date ? "100%" : "220%" }}
          />
          <View className="overflow-hidden w-48 mr-10">
            <Text className="pl-4 text-base" numberOfLines={1}>
              {props.firstname} {props.lastname}
            </Text>
            {props.date && <View><Text>{props.date}</Text>
            <SelectDropdown
	data={status}
  defaultValue={props.status}
	onSelect={(selectedItem, index) => {
		updatelogs({status:selectedItem},props.id).then((res) => res)
    return selectedItem
	}}
/></View>}
          </View>
          <Image source={notifColor} />
          <Image source={notifColor2} />
        </View>
      </Pressable>
    </View>
  );
}
