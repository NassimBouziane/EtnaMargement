import React from "react";
import { Button, Pressable, ScrollView, Text, View, Image } from "react-native";
import CardActions from "../components/CardActions";
import Navbar from "../components/Navbar";
import Ticket from "../components/Ticket";
import { Dimensions } from "react-native";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";

export default function Home({ navigation }: any) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View className="flex flex-row h-full w-full ">
      <Navbar />
      <ScrollView className="w-full h-full">
        <View
          className="flex w-full h-full rounded-3xl"
          style={{
            left: screenWidth < 768 ? "5%" : "5%",
            width: screenWidth < 768 ? "90%" : "80%",
            height: screenWidth < 768 ? "100%" : "93%",
          }}
        >
          <Text
            className="mt-12 text-4xl"
            style={{
              fontSize: screenWidth < 768 ? 24 : 32,
              marginTop: screenWidth < 768 ? "10%" : "8%",
              marginBottom: screenWidth < 768 ? "5%" : "8%",
            }}
          >
            Bonjour, Admin
          </Text>

          <View
            className="flex flex-row justify-between"
            style={{
              flexDirection: screenWidth < 768 ? "column" : "row",
              marginTop: screenWidth < 768 ? "0%" : "8%",
              justifyContent: screenWidth < 768 ? "center" : "space-between",
            }}
          >
            <View className="mb-10">
              <Text
                className="text-3xl mb-5"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                  marginTop: screenWidth < 768 ? "0%" : "8%",
                }}
              >
                Graphique journalier
              </Text>
              {/* <GraphDay /> */}
              <Image source={require("../../assets/graphPlaceholder.png")} />
            </View>
            <View
              className="right-5"
              style={{
                right: screenWidth < 768 ? "0%" : "5%",
              }}
            >
              <Text
                className="text-3xl"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                  marginTop: screenWidth < 768 ? "0%" : "8%",
                }}
              >
                Derniers tickets:
              </Text>
              <Ticket />
              <Ticket />
              <Ticket />
              <Text className="w-fit text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-gray-300">
                Voir plus
              </Text>
            </View>
          </View>
          <View className="mt-2 mb-2">
            <View
              className="w-full"
              style={{
                marginBottom: screenWidth < 768 ? 100 : 0,
              }}
            >
              <Text
                className="text-3xl mb-5"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                  marginTop: screenWidth < 768 ? "5%" : "8%",
                }}
              >
                Graphique de la semaine
              </Text>
              <Image source={require("../../assets/graphPlaceholder.png")} />

              {/* <GraphWeek /> */}
            </View>
            <Text className="text-2xl">Actions rapides</Text>
          </View>
          <View className="flex flex-row flex-wrap justify-between w-full mb-12">
            <Pressable onPress={() => navigation.navigate("Tickets")}>
              <CardActions
                title="Tickets"
                image={require("./../../assets/ticketIcon.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Messages")}>
              <CardActions
                title="Messages"
                image={require("./../../assets/messageIcon.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Scanner")}>
              <CardActions
                title="Scanner"
                image={require("./../../assets/scanIcon2.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Logs")}>
              <CardActions
                title="Export"
                image={require("./../../assets/logsIcon.png")}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
