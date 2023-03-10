import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import CardStudent from "../components/CardStudent";
import { getLogsByToday } from "../../services/logs/logs.services";
import Calendrier from "../components/Calendrier";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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
interface Calendar_Date {
  dateString: String;
  day: String;
  month: String;
  timestamp: Number;
  year: Number;
}

export default function StudentsAdmin() {
  const [dataDay, setDataDay] = useState<any>();
  const [searchValue, setSearchValue] = useState("");
  const [absentFilter, setAbsentFilter] = useState(false);
  const [retardFilter, setRetardFilter] = useState(false);
  const [presentFilter, setPresentFilter] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const refFlatList = useRef(null)
 

  const handleclick = (button: string) => {
    const isPresent = button === "Present";
    const isAbsent = button === "Absent";
    const isRetard = button === "Retard";

    if (
      (isPresent && !presentFilter) ||
      (isAbsent && !absentFilter) ||
      (isRetard && !retardFilter)
    ) {
      setPresentFilter(isPresent);
      setAbsentFilter(isAbsent);
      setRetardFilter(isRetard);
    } else {
      setPresentFilter(false);
      setAbsentFilter(false);
      setRetardFilter(false);
    }
  };

  const getByDate = async (date: String) => {

    await getLogsByToday(date).then((response) => {setDataDay(response.data),setLoading(false),navigation.setOptions({ headerTitle: `Etudiant ${date}` });
    ;});
    
  };
  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    navigation.setOptions({ headerTitle: `Etudiant ${today}` });
    getByDate(today);
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/logoEtna.png")}
            className=" ml-5 "
            style={{ width: 96, height: 30 }}
          />
        </View>
      ),
    });
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // reload data
    const today = new Date().toISOString().substring(0, 10);
    navigation.setOptions({ headerTitle: `Etudiant ${today}` });

    getByDate(today);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option: any) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <View>
      <View className="flex flex-col h-full w-full">
        <View className="ml-5">
          <View className="flex flex-row items-center">
            <View className="flex-row w-[84%] items-center bg-gray-200 px-3 py-3 rounded-xl mt-5 mb-3 mr-2">
              <Ionicons
                name="search-outline"
                size={24}
                className="text-gray-500"
              />
              <TextInput
                className="flex-1 text-gray-700 ml-5"
                placeholder="Rechercher par login"
                onChangeText={(text) => setSearchValue(text)}
                value={searchValue}
              />

              <Pressable
                onPress={() => {
                  setSearchValue("");
                }}
                className="px-3 "
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  className="text-gray-500"
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image
                source={require("../../assets/calendar.png")}
                style={{ width: 32, height: 32 }}
              />
            </Pressable>
          </View>
          <View className="flex flex-row justify-between w-[95%] ">
            <View
              style={{
                opacity: selectedOption === "Present" ? 1 : 0.5,
                backgroundColor: "#92F866",
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              className="px-5 py-2"
            >
              <Pressable
                onPress={() => {
                  handleclick("Present");
                  handlePress("Present");
                }}
              >
                <Text className="text-lg">Pr??sents</Text>
              </Pressable>
            </View>
            <View
              style={{
                opacity: selectedOption === "Retard" ? 1 : 0.5,
                backgroundColor: "#FBB733",
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              className="px-5 py-2"
            >
              <Pressable
                onPress={() => {
                  handleclick("Retard");
                  handlePress("Retard");
                }}
              >
                <Text className="text-lg">Retard</Text>
              </Pressable>
            </View>
            <View
              style={{
                opacity: selectedOption === "Absent" ? 1 : 0.5,
                backgroundColor: "#F04C4C",
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              className="px-5 py-2"
            >
              <Pressable
                onPress={() => {
                  handleclick("Absent");
                  handlePress("Absent");
                }}
              >
                <Text className="text-lg">Absents</Text>
              </Pressable>
            </View>
          </View>
        </View>
        {isLoading ? (
          <ScrollView
            className="w-full h-full ml-5"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <ActivityIndicator size="large" color="blue" className="mt-64" />
          </ScrollView>
        ) : (
          <FlatList
            ref={refFlatList}
            className="w-full h-full ml-5 mt-3"
            data={dataDay.filter((item: Logs) => {
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
                item.afternoon !== "Present" &&
                item.morning !== "Distanciel" &&
                item.afternoon !== "Distanciel"
              ) {
                return false;
              }
              return item.login
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })}
            keyExtractor={(item: Logs) => item.id.toString()}
            renderItem={({ item }: { item: Logs }) => {
              let notifColor;
              let notifColor2;
              const color = () => {
                switch (item.morning) {
                  case "Present":
                    notifColor = require("../../assets/notif_green.png");
                    break;
                  case "Retard":
                    notifColor = require("../../assets/notif_yellow.png");
                    break;
                  case "Distanciel":
                    notifColor = require("../../assets/notif_purple.png");
                    break;
                  default:
                    notifColor = require("../../assets/notif_red.png");
                    break;
                }

                switch (item.afternoon) {
                  case "Present":
                    notifColor2 = require("../../assets/notif_green.png");
                    break;
                  case "Retard":
                    notifColor2 = require("../../assets/notif_yellow.png");
                    break;
                  case "Distanciel":
                    notifColor2 = require("../../assets/notif_purple.png");
                    break;
                  default:
                    notifColor2 = require("../../assets/notif_red.png");
                    break;
                }
              };

              color();
              return (
                <CardStudent
                  key={notifColor2}
                  login={item.login}
                  morning={item.morning}
                  afternoon={item.afternoon}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  notifColor={notifColor}
                  notifColor2={notifColor2}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <Modal
                isVisible={modalVisible}
                onBackdropPress={() => {
                  setModalVisible(false);
                }}
              >
                <View className="flex">
                  <Calendrier
                    component="Logs"
                    onDayPress={(e: Calendar_Date) => {
                      getByDate(e.dateString), handleclick("reset");
                    }}
                  />
                </View>
              </Modal>
            }
          />
        )}
        <Navbar />
      </View>
    </View>
  );
}
