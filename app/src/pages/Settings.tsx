import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Pressable, Text, View, Button } from "react-native";
import Navbar from "../components/Navbar";
import { NativeModules } from "react-native";
import Calendrier from "../components/Calendrier";
// import { extendTheme, withColorScheme } from "native-base";

export default function Settings() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [chooseDate, setChooseDate] = useState(false)
  const toggleDarkMode = () => {
    if (isDarkModeEnabled) {
      NativeModules.DevSettings.reload();
    } else {
      setIsDarkModeEnabled(true);
    }
  };
  const navigation: any = useNavigation();
  // const theme = extendTheme(
  //   withColorScheme({ colorScheme: isDarkModeEnabled ? "dark" : "light" })
  // );
  if(chooseDate){
    return (
      <View>
        <Text> Selectionner le jour pour l'export du excel</Text>
        <Calendrier component='Excel'/>
        <Button title='back' onPress={() =>{setChooseDate(false)}}/>
      </View>
    )
  }

  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <View className="mt-6 ml-5">
        <View>
          <Text className="mt-3 mb-3 text-xl font-semibold">
            Paramètres généraux
          </Text>
          <View
            className="h-[1px] w-64 bg-black  mb-5
          "
          ></View>
          <View>
            <View className="flex flex-row items-center">
              <Image
                source={require("../../assets/dataIcon.png")}
                className="w-6 h-6 mr-2"
              />
              <Pressable onPress={()=>{setChooseDate(true)}}>
                <Text className="my-5 text-xl">Exporter les données</Text>
              </Pressable>
            </View>
            <View className="flex flex-row items-center">
              <Image
                source={require("../../assets/resetIcon.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="my-5 text-xl">Réinitialiser l'émargement</Text>
            </View>
            <View className="flex flex-row items-center">
              <Image
                source={require("../../assets/darkModeIcon.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="my-5 text-xl">Mode sombre</Text>
              {/* <View>
                <Button onPress={toggleDarkMode} title="Mode sombre" />
              </View> */}
            </View>
          </View>
          <Text className="mt-10 mb-3 text-xl font-semibold">Compte</Text>
          <View
            className="h-[1px] w-64 bg-black mb-5
          "
          ></View>
          <View>
            <Pressable onPress={() => navigation.navigate("Scanner")}>
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/scanIcon.png")}
                  className="w-6 h-6 mr-2"
                />
                <Text className="my-5 text-xl">Mode scan</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/logoutIcon.png")}
                  className="w-6 h-8 mr-2"
                />
                <Text className="my-5 text-xl">Se déconnecter</Text>
              </View>
            </Pressable>
          </View>
          <Text className="mt-10 mb-3 text-xl">À propos</Text>
          <View
            className="h-[1px] w-64 bg-black mb-5
          "
          ></View>
          <View>
            <Text>Version 1.0</Text>
            <Text className="w-1/2">
              Contributeurs : Thomas BOULARD, Nassim Abderaouf BOUZIANE, Paul
              MENUT, Raphaël PLASSART
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
