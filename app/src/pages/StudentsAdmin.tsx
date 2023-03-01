import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import CardStudent from "../components/CardStudent";

export default function StudentsAdmin() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 100); // Temps de chargement de 3 secondes
  }, []);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log(`Recherche: ${searchText}`);
    // implémenter la logique de la recherche
  };
  return (
    <View>
      <View className="flex flex-row h-full w-full ">
        <Navbar />
        <View>
          <View className="ml-5">
            <View className="flex-row w-[280px] items-center bg-gray-200 px-3 py-3 rounded-xl mt-5 mb-3">
              <Ionicons
                name="search-outline"
                size={24}
                className="text-gray-500"
              />
              <TextInput
                className="flex-1 text-gray-700 ml-5"
                placeholder="Rechercher"
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                value={searchText}
              />
            </View>
            <View className="flex flex-row w-full gap-6 ">
              <View className="bg-[#92F866] px-4 py-2 rounded-xl">
                <Text className="text-lg">Prés.</Text>
              </View>
              <View className="bg-[#FBB733] px-4 py-2 rounded-xl">
                <Text className="text-lg">Retard</Text>
              </View>
              <View className="bg-[#F04C4C] px-4 py-2 rounded-xl">
                <Text className="text-lg">Abs.</Text>
              </View>
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="blue" className="mt-64" />
          ) : (
            <ScrollView
              className=" h-full ml-5"
              showsVerticalScrollIndicator={false}
            >
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
              <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              />
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
