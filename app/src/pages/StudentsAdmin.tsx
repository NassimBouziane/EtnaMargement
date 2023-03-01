import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View, Image
} from "react-native";
import Modal from "react-native-modal";

import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import CardStudent from "../components/CardStudent";
import { getLogsByToday } from "../../services/logs/logs.services";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import ReactNativeModal from "react-native-modal";
import Calendrier from "../components/Calendrier";


interface Logs {
  id: any;
  login: String;
  date: String;
  morning: String;
  afternoon: String;
  status: String;
  hours_morning: String;
  hours_afternoon: String;
  firstname: String;
  lastname: String;
}
 interface Calendar_Date{
  dateString:String,
  day:String,
  month:String,
  timestamp:Number,
  year:Number
}

export default function StudentsAdmin() {
  const [dataDay, setDataDay] = useState<any>();
  const [searchValue, setSearchValue] = useState("");
  const [absentFilter, setAbsentFilter] = useState(false);
  const [retardFilter, setRetardFilter] = useState(false);
  const [presentFilter, setPresentFilter] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleclick = (button: string) => {
    setPresentFilter(button === "Present");
    setAbsentFilter(button === "Absent");
    setRetardFilter(button === "Retard");
  };

  const getByDate = async (date: String) => {
    await getLogsByToday(date).then((response) => setDataDay(response.data));
    setLoading(false);
  };
  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);

    getByDate(today);
  }, []);

  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);


  const handleSearch = () => {
    console.log(`Recherche: ${searchText}`);
    // implémenter la logique de la recherche
  };
  const getUserInfo = async (login: String) => {
    const token: any = await AsyncStorage.getItem("token");
    const user = await getUserByLogin(login, await JSON.parse(token));
    return user;

    //firstname={user.firstname ? user.firstname : ""} lastname={user.lastname ? user.lastname : ""}
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
                placeholder="Rechercher par login"
                onChangeText={(text) => setSearchValue(text)}
                onSubmitEditing={handleSearch}
                value={searchValue}
              />
              <Pressable onPress={() =>{setModalVisible(!modalVisible)}}><Image
            source={require("../../assets/calendar.png")}
            style={{ width: 32, height: 32 }}
          /></Pressable>
            </View>
            <View className="flex flex-row w-full gap-6 ">
              <View className="bg-[#92F866] px-4 py-2 rounded-xl">
                <Pressable onPress={() => handleclick("Present")}>
                  <Text className="text-lg">Prés.</Text>
                </Pressable>
              </View>
              <View className="bg-[#FBB733] px-4 py-2 rounded-xl">
                <Pressable onPress={() => handleclick("Retard")}>
                  <Text className="text-lg">Retard</Text>
                </Pressable>
              </View>
              <View className="bg-[#F04C4C] px-4 py-2 rounded-xl">
                <Pressable onPress={() => handleclick("Absent")}>
                  <Text className="text-lg">Abs.</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="blue" className="mt-64" />


          ) : (
            <ScrollView
              className="w-full h-full ml-5 mt-3"
              showsVerticalScrollIndicator={false}
            >
          <Modal isVisible={modalVisible} onBackdropPress={() => {setModalVisible(false)}}>
        <View className="flex">
          <Calendrier component="Logs" onDayPress={(e: Calendar_Date)=> {getByDate(e.dateString)}}/>


        </View>
      </Modal>
              {dataDay &&
                dataDay
                  .filter((item: Logs) => {
                    if (
                      absentFilter &&
                      item.morning !== "Absent" &&
                      item.afternoon !== "Absent"
                    ) {
                      return false;
                    }
                    if (
                      retardFilter &&
                      item.morning !== "Retard" &&
                      item.afternoon !== "Retard"
                    ) {
                      return false;
                    }
                    if (
                      presentFilter &&
                      item.morning !== "Present" &&
                      item.afternoon !== "Present"
                    ) {
                      return false;
                    }
                    return item.login
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .map((items: Logs, i: Number) => {
                    return (
                      <CardStudent
                        key={items.id}
                        login={items.login}
                        morning={items.morning}
                        afternoon={items.afternoon}
                        firstname={items.firstname}
                        lastname={items.lastname}
                      />
                    );
                  })}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
