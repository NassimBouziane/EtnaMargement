import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import Navbar from "../components/Navbar";
import { NativeModules } from "react-native";
import Calendrier from "../components/Calendrier";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { extendTheme, withColorScheme } from "native-base";

export default function Settings() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/logoEtna.png")}
            className=" ml-5 "
            style={{ width: 96, height: 30 }}
          />
        </View>
      ),
    });
  }, [navigation]);

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("remember");
  };

  if (chooseDate) {
    return (
      <View>
        <Text className="text-lg rounded-lg text-center py-2 px-3 bg-[#363D97] color-white w-[90%] mx-auto mt-5 mb-10">
          Exporter les émargements
        </Text>
        <Calendrier component="Excel" />
        <Pressable
          onPress={() => {
            setChooseDate(false);
          }}
        >
          <Text className="text-center mt-10 bg-slate-300 w-1/4 mx-auto py-2 rounded-xl text-lg">
            Retour
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex flex-col h-full w-full">
      <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
        <View className="ml-5">
          <Text className="mt-3 mb-3 text-xl font-semibold">
            Paramètres généraux
          </Text>
          <View
            className="h-[1px] w-64 bg-black  mb-3
          "
          ></View>
          <View>
            <Pressable
              onPress={() => {
                setChooseDate(true);
              }}
            >
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/dataIcon.png")}
                  className="w-6 h-6 mr-2"
                />

                <Text className="my-5 text-xl">Exporter les données</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Cette fonctionnalité n'est pas encore implémentée."
                )
              }
            >
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/resetIcon.png")}
                  className="w-6 h-6 mr-2"
                />
                <Text className="my-5 text-xl">Réinitialiser l'émargement</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Cette fonctionnalité n'est pas encore implémentée."
                )
              }
            >
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/darkModeIcon.png")}
                  className="w-6 h-6 mr-2"
                />
                <Text className="my-5 text-xl">Mode sombre</Text>
              </View>
            </Pressable>
          </View>
          <Text className="mt-10 mb-3 text-xl font-semibold">Compte</Text>
          <View
            className="h-[1px] w-64 bg-black mb-3
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
            <Pressable
              onPress={() => {
                logOut();
                navigation.navigate("Login");
              }}
            >
              <View className="flex flex-row items-center">
                <Image
                  source={require("../../assets/logoutIcon.png")}
                  className="w-6 h-8 mr-2"
                />
                <Text className="my-5 text-xl">Se déconnecter</Text>
              </View>
            </Pressable>
          </View>
          <Text className="mt-3 mb-3 text-xl font-semibold">À propos</Text>
          <View
            className="h-[1px] w-64 bg-black mb-5
          "
          ></View>
          <View>
            <Text>Version 1.0</Text>
            <Text className="w-[95%]">
              Contributeurs : Thomas BOULARD, Nassim Abderaouf BOUZIANE, Paul
              MENUT, Raphaël PLASSART
            </Text>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
}
