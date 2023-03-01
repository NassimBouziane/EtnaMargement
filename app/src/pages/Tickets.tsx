import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import Navbar from "../components/Navbar";
import Ticketlarge from "../components/TicketLarge";

export default function Tickets() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 50); // Temps de chargement de 3 secondes
  }, []);

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <View className="flex flex-row h-full">
        <Navbar />
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="blue" className="mt-64" />
          ) : (
            <View
              style={{
                marginLeft: screenWidth < 768 ? "5%" : "10%",
              }}
            >
              <View className="mt-5">
                <View className="flex flex-row mb-5 items-center">
                  <Text
                    className="bg-red-500 text-white py-[2px] px-2 rounded-2xl"
                    style={{
                      fontSize: screenWidth < 768 ? 14 : 32,
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
                    className="w-full text-lg text-center mt-2 py-2 mr-5 px-2 rounded-2xl bg-gray-300"
                    style={{
                      width: screenWidth < 768 ? "auto" : "auto",
                      paddingTop: screenWidth < 768 ? 5 : 10,
                      paddingBottom: screenWidth < 768 ? 5 : 10,
                    }}
                  >
                    Voir plus
                  </Text>
                </View>
              </View>
              <View className="mt-10 mb-10">
                <View className="flex flex-row mb-5 items-center">
                  <Text className="bg-red-500 text-white py-[2px] px-2 rounded-3xl">
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
                  <Text
                    className="w-full text-lg text-center mt-2 py-2 mr-5 px-2 rounded-2xl bg-gray-300"
                    style={{
                      width: screenWidth < 768 ? "auto" : "auto",
                      paddingTop: screenWidth < 768 ? 5 : 10,
                      paddingBottom: screenWidth < 768 ? 5 : 10,
                    }}
                  >
                    Voir plus
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
