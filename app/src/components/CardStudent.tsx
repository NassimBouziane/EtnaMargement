import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { updatelogs } from "../../services/logs/logs.services";

export default function CardStudent(props: any) {
  const status = ["Justifié", "Non Justifié", "En Attente"];
  const presence =["Present","Absent","Retard","Distanciel"]

  const navigation: any = useNavigation();
  let notifColor: any = require("../../assets/notif_red.png");
  let notifColor2: any = require("../../assets/notif_red.png");



 
  if (props.morning == "Present") {
    notifColor = require("../../assets/notif_green.png");
  } else if (props.morning == "Retard" ) {
    notifColor = require("../../assets/notif_yellow.png");
  }
  if (props.afternoon == "Present") {
    notifColor2 = require("../../assets/notif_green.png");
  } else if (props.afternoon == "Retard") {
    notifColor2 = require("../../assets/notif_yellow.png");
  }


  return (
    <View className="bg-[#D9D9D9] w-[90%] rounded-xl my-2">
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
        <View className="flex flex-row gap-1 py-5 ml-1 items-center">
          <Image
            className="rounded-lg w-64"
            source={{
              uri: `https://auth.etna-alternance.net/api/users/${props.login}/photo`,
            }}
            style={{
              width: "18%",
              height: props.date ? "110%" : "150%",
              display: props.date ? "none" : "flex",
            }}
          />
          <View
            className="overflow-hidden w-48 mr-10 "
            style={{ width: props.date ? "70%" : "58%" }}
          >
            <Text
              className="pl-4 text-base"
              numberOfLines={1}
              style={{ display: props.date ? "none" : "flex" }}
            >
              {props.firstname} {props.lastname}
            </Text>
            {props.date && (
              <View className="ml-5">
                <Text className=" tex-xl mb-1 text-lg">{props.date}</Text>
                <SelectDropdown
                  data={presence}
                  buttonStyle={{
                    borderRadius: 5,
                  }}
                  defaultValue={props.morning}
                  onSelect={(selectedItem: any, index: any) => {
                    updatelogs({ morning: selectedItem }, props.id).then(
                      (res) => res
                    );
                    return selectedItem;
                  }}
                />
                                <SelectDropdown
                  data={presence}
                  buttonStyle={{
                    borderRadius: 5,
                  }}
                  defaultValue={props.afternoon}
                  onSelect={(selectedItem: any, index: any) => {
                    updatelogs({ afternoon: selectedItem }, props.id).then(
                      (res) => res
                    );
                    return selectedItem;
                  }}
                />
                {props.morning ==="Absent" || props.morning ==="Retard" || props.afternoon ==="Absent" || props.afternoon ==="Retard" ?                   <SelectDropdown
                  data={status}
                  buttonStyle={{
                    borderRadius: 5,
                  }}
                  defaultValue={props.status}
                  onSelect={(selectedItem: any, index: any) => {
                    updatelogs({ status: selectedItem }, props.id).then(
                      (res) => res
                    );
                    return selectedItem;
                  }}
                />: <></>}

              </View>
            )}
          </View>
          <View className="flex flex-col gap-2">
            <Image source={notifColor} />
            <Image source={notifColor2} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
