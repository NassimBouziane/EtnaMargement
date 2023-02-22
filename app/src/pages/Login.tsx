import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const {height, width} = Dimensions.get("window")

export default function Login() {
  return (
    <View style={{flex:1, width: width, height: height}}>
      <Image className="m-4" source={require('../../assets/etna-logo.png')}/>
      <View className="flex w-[80%] h-[30%] mx-auto">
        <Image source={require('../../assets/login-illustration.png')} className="w-full h-full"/>
      </View>
      <View className="flex bg-green-300 w-[80%] h-full mx-auto">
      <Text className="text-[32px]">Connexion</Text>
      </View>
    </View>
  );
}