import React from "react";
import { Button, Pressable, ScrollView, Text, View } from "react-native";
import CardActions from "../components/CardActions";
import Navbar from "../components/Navbar";
import Ticket from "../components/Ticket";
import { Dimensions } from "react-native";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";

export default function Home({ navigation }: any) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      className="flex flex-row h-full w-full "
      style={{
        backgroundColor: screenWidth < 768 ? "white" : "#E3E3E3",
      }}
    >
      <Navbar />
      <ScrollView>
        <View
          className="flex w-4/5 h-full   bg-[#E3E3E3] rounded-3xl"
          style={{
            left: screenWidth < 768 ? "5%" : "5%",
            width: screenWidth < 768 ? "90%" : "80%",
            backgroundColor: screenWidth < 768 ? "white" : "#E3E3E3",
            height: screenWidth < 768 ? "100%" : "93%",
          }}
        >
          <Text
            className="mt-12 text-4xl mb-12 ml-12"
            style={{
              fontSize: screenWidth < 768 ? 24 : 32,
              marginTop: screenWidth < 768 ? "20%" : "8%",
              marginBottom: screenWidth < 768 ? "0%" : "8%",
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
            <View className="">
              <Text
                className="text-3xl mb-5"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                  marginTop: screenWidth < 768 ? "0%" : "8%",
                }}
              >
                Graphique journalier
              </Text>
              <GraphDay/>
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
          <View className="mt-2">
            <View
              className="w-full"
              style={{
                marginBottom: screenWidth < 768 ? 100 : 0,
              }}
            >
              <Text
                className="text-3xl mb-5 ml-8"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                  marginTop: screenWidth < 768 ? "5%" : "8%",
                }}
              >
                Graphique de la semaine
              </Text>
              <GraphWeek/>
            </View>

            <View className="flex flex-row w-4/5 h-4/5 justify-between bg-orange-500 ">
              <Text>Actions rapides</Text>
              <Pressable onPress={() => navigation.navigate("Tickets")}>
                <CardActions
                  title="Tickets"
                  image={require("./../../assets/button_ticket.png")}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Messages")}>
                <CardActions
                  title="Messages"
                  image={require("./../../assets/button_message.png")}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Scanner")}>
                <CardActions
                  title="Mode scan"
                  image={require("./../../assets/button_scan.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
