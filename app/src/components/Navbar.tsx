import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Navbar() {
  const screenWidth = Dimensions.get("window").width;
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    // Mettre à jour la page courante lorsque l'écran est en focus
    if (isFocused) {
      setCurrentPage(
        navigation.getState().routes[navigation.getState().index].name
      );
    }
  }, [isFocused]);

  return (
    <View
      className="w-full h-[8%] bg-[#5863F8] fixed bottom-0"
      style={{
        width: screenWidth < 768 ? "100%" : "15%",
      }}
    >
      <View className="flex justify-around flex-row w-[100%] mx-0 top-3">
        <View className="bg-transparent">
          <Pressable
            onPress={() => {
              setCurrentPage("Home");
              navigation.navigate("Home");
            }}
          >
            <Fontisto
              name="home"
              size={26}
              color="white"
              style={{
                color: currentPage === "Home" ? "#242866" : "white",
              }}
            />
          </Pressable>
        </View>
        <View className="bg-transparent">
          <Pressable
            className=""
            onPress={() => {
              setCurrentPage("Tickets");
              navigation.navigate("Tickets");
            }}
          >
            <Fontisto
              name="ticket"
              size={26}
              color="white"
              style={{
                color: currentPage === "Tickets" ? "#242866" : "white",
              }}
            />
          </Pressable>
        </View>

        <View className="bg-transparent">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Etudiants");
              setCurrentPage("Etudiants");
            }}
          >
            <Fontisto
              name="search"
              size={26}
              color="white"
              style={{
                color: currentPage === "Etudiants" ? "#242866" : "white",
              }}
            />
          </Pressable>
        </View>
        <View className="bg-transparent">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Scanner");
              setCurrentPage("Scanner");
            }}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color="white"
              style={{
                color: currentPage === "Scanner" ? "#242866" : "white",
              }}
            />
          </Pressable>
        </View>
        <View className=" bg-transparent">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Settings");
              setCurrentPage("Settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color="white"
              style={{
                color: currentPage === "Settings" ? "#242866" : "white",
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
