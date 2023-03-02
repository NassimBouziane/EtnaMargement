import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  View,
} from "react-native";

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
      <View className="flex justify-center gap-4 items-center flex-row left-4">
        <View className="bg-transparent w-[64px] h-[64px] top-3">
          <Pressable
            onPress={() => {
              setCurrentPage("Home");
              navigation.navigate("Home");
            }}
          >
            <Image
              source={require("../../assets/navig-home.png")}
              style={{
                width: screenWidth < 768 ? "45%" : "100%",
                height: screenWidth < 768 ? "70%" : "100%",
              }}
              className={`${
                currentPage === "Home" ? "bg-[#363D97] rounded-lg" : ""
              }`}
            />
          </Pressable>
        </View>
        <View className="w-[64px] h-[64px] bg-transparent top-3">
          <Pressable
            className=""
            onPress={() => {
              setCurrentPage("Tickets");
              navigation.navigate("Tickets");
            }}
          >
            <Image
              source={require("../../assets/navig-ticket.png")}
              style={{
                width: screenWidth < 768 ? "50%" : "100%",
                height: screenWidth < 768 ? "75%" : "100%",
              }}
              className={`${
                currentPage === "Tickets" ? "bg-[#363D97]" : ""
              } rounded-lg`}
            />
          </Pressable>
        </View>

        <View className="w-[64px] h-[64px] bg-transparent top-4">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Etudiants");
              setCurrentPage("Etudiants");
            }}
          >
            <Image
              source={require("../../assets/navig-student.png")}
              style={{
                width: screenWidth < 768 ? "50%" : "100%",
                height: screenWidth < 768 ? "62%" : "100%",
              }}
              className={`${
                currentPage === "Etudiants" ? "bg-[#363D97]" : ""
              } rounded-lg`}
            />
          </Pressable>
        </View>
        <View className="w-[64px] h-[64px] bg-transparent top-3">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Scanner");
              setCurrentPage("Scanner");
            }}
          >
            <Image
              source={require("../../assets/navig-scan.png")}
              style={{
                width: screenWidth < 768 ? "50%" : "100%",
                height: screenWidth < 768 ? "68%" : "100%",
              }}
              className={`${
                currentPage === "Scanner" ? "bg-[#363D97]" : ""
              } rounded-lg`}
            />
          </Pressable>
        </View>
        <View className="w-[64px] h-[64px] bg-transparent top-2">
          <Pressable
            className=""
            onPress={() => {
              navigation.navigate("Settings");
              setCurrentPage("Settings");
            }}
          >
            <Image
              source={require("../../assets/navig-settings.png")}
              style={{
                width: screenWidth < 768 ? "50%" : "100%",
                height: screenWidth < 768 ? "75%" : "100%",
              }}
              className={`${
                currentPage === "Settings" ? "bg-[#363D97]" : ""
              } rounded-lg`}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
