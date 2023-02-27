import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import Ticketlarge from "../components/TicketLarge";

export default function Tickets() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <ScrollView className="my-12">
        <View
          style={{
            marginLeft: screenWidth < 768 ? "5%" : "10%",
          }}
        >
          <Text
            className="text-center w-fit text-3xl py-3 rounded-l-2xl text-black"
            style={{
              fontSize: screenWidth < 768 ? 24 : 32,
              textAlign: screenWidth < 768 ? "left" : "center",
              paddingLeft: screenWidth < 768 ? 15 : 0,
            }}
          >
            Gestion des tickets
          </Text>
          <View className="mt-10">
            <View className="flex flex-row mb-5 items-center">
              <Text
                className="bg-red-500 text-white py-1 px-3 rounded-3xl"
                style={{
                  fontSize: screenWidth < 768 ? 16 : 32,
                }}
              >
                7
              </Text>
              <Text
                className="ml-5 text-3xl"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                }}
              >
                Nouveaux tickets
              </Text>
            </View>
            <View className="">
              <Ticketlarge />
              <Ticketlarge />
              <Ticketlarge />
              <Text
                className="w-fit text-xl text-center mt-2 py-2 px-2 rounded-2xl bg-gray-300"
                style={{
                  width: screenWidth < 768 ? "90%" : "auto",
                  paddingTop: screenWidth < 768 ? 5 : 10,
                  paddingBottom: screenWidth < 768 ? 5 : 10,
                }}
              >
                Voir plus
              </Text>
            </View>
          </View>
          <View className="mt-10">
            <View className="flex flex-row mb-5 items-center">
              <Text className="bg-red-500 text-white py-1 px-3 rounded-3xl">
                5
              </Text>
              <Text
                className="ml-5 text-3xl"
                style={{
                  fontSize: screenWidth < 768 ? 24 : 32,
                }}
              >
                Tickets en cours
              </Text>
            </View>
            <View className="">
              <Ticketlarge />
              <Ticketlarge />
              <Ticketlarge />
              <Text className="w-fit text-xl text-center mt-2 py-2 px-2 rounded-2xl bg-gray-300">
                Voir plus
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}