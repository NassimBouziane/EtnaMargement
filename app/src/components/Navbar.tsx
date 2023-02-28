import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
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

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("remember");
  };

  return (
    <View
      className="flex justify-evenly items-center gap-2 w-[15%] h-[90%] bg-[#5863F8] rounded-3xl"
      style={{
        width: screenWidth < 768 ? "20%" : "15%",
        paddingLeft: screenWidth < 768 ? "5%" : "0%",
        top: screenWidth < 768 ? "10%" : "unset",
      }}
    >
      <View className="bg-transparent w-[64px] h-[64px]">
        <Pressable
          onPress={() => {
            setCurrentPage("Home");
            navigation.navigate("Home");
          }}
        >
          <Image
            source={require("../../assets/nav_home.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "75%" : "100%",
            }}
            className={`${currentPage === "Home" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent ">
        <Pressable
          className=""
          onPress={() => {
            setCurrentPage("Tickets");
            navigation.navigate("Tickets");
          }}
        >
          <Image
            source={require("../../assets/nav_tickets.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "64%" : "100%",
            }}
            className={`${currentPage === "Tickets" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable
          className=""
          onPress={() => {
            navigation.navigate("Messages"), setCurrentPage("Messages");
          }}
        >
          <Image
            source={require("../../assets/nav_message.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "75%" : "100%",
            }}
            className={`${currentPage === "Messages" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable
          className=""
          onPress={() => {
            navigation.navigate("Etudiants");
            setCurrentPage("Etudiants");
          }}
        >
          <Image
            source={require("../../assets/nav_student.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "62%" : "100%",
            }}
            className={`${currentPage === "Etudiants" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable
          className=""
          onPress={() => {
            navigation.navigate("Scanner");
            setCurrentPage("Scanner");
          }}
        >
          <Image
            source={require("../../assets/nav_scan.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "68%" : "100%",
            }}
            className={`${currentPage === "Scanner" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable
          className=""
          onPress={() => {
            navigation.navigate("Settings");
            setCurrentPage("Settings");
          }}
        >
          <Image
            source={require("../../assets/nav_parameters.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "75%" : "100%",
            }}
            className={`${currentPage === "Settings" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
      <View className="w-[64px] h-[64px] bg-transparent">
        <Pressable
          className=""
          onPress={() => {
            setCurrentPage("Login");

            navigation.navigate("Login");
            logOut();
          }}
        >
          <Image
            source={require("../../assets/nav_disconnect.png")}
            style={{
              width: screenWidth < 768 ? "50%" : "100%",
              height: screenWidth < 768 ? "75%" : "100%",
            }}
            className={`${currentPage === "Login" ? "bg-black" : ""}`}
          />
        </Pressable>
      </View>
    </View>
  );
}
