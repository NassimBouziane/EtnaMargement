import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { getNote, getPromo } from "../../services/etna/etna.services";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import CardStudent from "../components/CardStudent";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import Navbar from "../components/Navbar";

export default function StudentsAdminHome() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 100); // Temps de chargement de 3 secondes
  }, []);
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-64" />
      ) : (
        <View className="flex flex-row h-full">
          <Navbar />
          <View className="mt-5 ml-5 ">
            <View className="w-[280px] px-4 py-2 bg-gray-200 flex-row items-center rounded-2xl">
              <Icon name="search" className="mr-2 text-gray-400" />
              <TextInput placeholder="Cameron..." className="flex-1 text-sm" />
            </View>
            <View className="flex flex-row mt-2">
              <View className="bg-[#6EEB39] px-4 py-2 rounded-xl mr-3">
                <Text>Présents</Text>
              </View>
              <View className="bg-[#FBB733]  px-4 py-2 rounded-xl ">
                <Text>Absents</Text>
              </View>
              <View className="bg-[#E41E1E]  px-4 py-2 rounded-xl ml-3">
                <Text className="text-white">Retards</Text>
              </View>
            </View>
            <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
              <CardStudent firstname="Raphaël" lastname="Plassart" />
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
