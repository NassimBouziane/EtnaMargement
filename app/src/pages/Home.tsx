import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import CardActions from "../components/CardActions";
import Navbar from "../components/Navbar";
import { Dimensions } from "react-native";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import Calendrier from "../components/Calendrier";
import CardTicket from "../components/CardTicket";
import { getTicket } from "../../services/etna/etna.services";
import { getLogsByDate } from "../../services/logs/logs.services";
import moment from "moment-timezone";

export default function Home({ navigation }: any) {
  const [user, setUser] = React.useState<any>("");
  const [chooseDate, setChooseDate] = useState(false);
  const [tickets, setTickets] = React.useState<any>();
  const [lentickets, setLentickets] = React.useState<any>(3);
  const [buttonlentickets, setButtonlentickets] = React.useState<any>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [retardData, setRetardData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [absentData, setAbsentData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [presentData, setPresentData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [distancielData, setDistancielData] = useState<number[]>([0, 0, 0, 0, 0]);
  const [dataGraphDay, setDataGraphDay] = useState<any>()
  const [isLoading, setLoading] = useState(true);

  const UserInfo = async () => {
    const token: any = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    setUser(user);
    await getTicket(await JSON.parse(token)).then((res) => {
      setTickets(res), setLoading(false);
    });
  };
  

  const setDataDay = async() => {
    const date = moment().tz('Europe/Paris').format('YYYY-MM-DD');
    await getLogsByDate(date).then((res) => {
      setDataGraphDay([res.data.Absent, res.data.Distanciel, res.data.Present, res.data.Retard])
    })
  }

  const setDataWeek = async () => {
    for (let i = 1; i < 6; i++) {
      const now = moment();
      const weekNumber = now.isoWeek();
      const day = moment().isoWeekday(i);
      await getLogsByDate(day.toISOString().substring(0, 10)).then((res) => {
        setRetardData((prevData) => {
          const newData = [...prevData]; // Crée une copie du tableau précédent
          newData[i - 1] = res.data.Retard; // Modifie la valeur à l'indice i avec les nouvelles données
          return newData; // Renvoie le nouveau tableau pour mettre à jour l'état
        });
        setAbsentData((prevData) => {
          // Même principe pour les autres tableaux de données
          const newData = [...prevData];
          newData[i - 1] = res.data.Absent;
          return newData;
        });
        setPresentData((prevData) => {
          const newData = [...prevData];
          newData[i - 1] = res.data.Present;
          return newData;
        });
        setDistancielData((prevData) => {
          const newData = [...prevData];
          newData[i - 1] = res.data.Distanciel;
          return newData;
        });
      });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // reload data
    UserInfo();
    setLentickets(3);
    setButtonlentickets(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    UserInfo();
    setDataDay();
    setDataWeek();
    // user change => re-render
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View></View>
      ),
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/etna-logo.png")}
            className="my-auto w-[100px] h-[31px]"
          />
        </View>
      ),
    });
  }, [navigation]);

  const screenWidth = Dimensions.get("window").width;

  if (chooseDate) {
    return (
      <View>
        <Text className="text-lg rounded-lg text-center py-2 px-3 bg-[#363D97] color-white w-[90%] mx-auto mt-5 mb-10">
          Exporter les émargements
        </Text>
        <Calendrier component="Excel" />
        <Pressable
          onPress={() => {
            setChooseDate(false);
          }}
        >
          <Text className="text-center mt-10 bg-slate-300 w-1/4 mx-auto py-2 rounded-xl text-lg">
            Retour
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <View className="flex flex-col h-full w-full">
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
              Bonjour, {user.firstname ? user.firstname : ""}
            </Text>

            <View
              className="flex flex-row justify-between"
              style={{
                flexDirection: screenWidth < 768 ? "column" : "row",
                marginTop: screenWidth < 768 ? "0%" : "8%",
                justifyContent: screenWidth < 768 ? "center" : "space-between",
              }}
            >
              <View className="mb-3">
                <Text
                  className="text-lg rounded-lg text-center mb-6 py-2 px-3 bg-[#363D97] color-white"
                  style={{
                    fontSize: screenWidth < 768 ? 20 : 32,
                    marginTop: screenWidth < 768 ? "5%" : "8%",
                  }}
                >
                  Graphique journalier
                </Text>
                {isLoading ? (
                  <ScrollView className="w-full h-[300px] ml-5">
                    <ActivityIndicator
                      size="large"
                      color="blue"
                      className="mt-64"
                    />
                  </ScrollView>
                ) : (
                  <View className="w-full mx-auto ml-4">
                    {dataGraphDay && <GraphDay dataGraphDay={dataGraphDay} />}
                  </View>
                )}
              </View>
              <View
                className="right-5"
                style={{
                  right: screenWidth < 768 ? "0%" : "5%",
                }}
              >
                <View className="flex flex-row mb-5 justify-center mx-0 items-center py-2 px-3 bg-[#363D97] rounded-xl">
                  <Text
                    className="bg-red-500 text-white py-1 px-2 rounded-2xl"
                    style={{
                      fontSize: screenWidth < 768 ? 14 : 32,
                    }}
                  >
                    {tickets ? tickets.data.length : ""}
                  </Text>
                  <Text className="ml-5 text-xl text-white">Tickets</Text>
                </View>
                {isLoading ? (
                  <ScrollView className="w-full h-full ml-5">
                    <ActivityIndicator
                      size="large"
                      color="blue"
                      className="mt-64"
                    />
                  </ScrollView>
                ) : (
                  <View className="flex h-fit w-full mx-auto mt-[10px] rounded-lg">
                    <View style={{ alignSelf: "center" }}>
                      {tickets &&
                        tickets.data
                          .slice(0, lentickets)
                          .map((ticket: any) => (
                            <CardTicket
                              key={ticket.id}
                              login={ticket?.creator?.login || ""}
                              name={
                                user
                                  ? `${user.lastname
                                      .charAt(0)
                                      .toUpperCase()}${user.lastname
                                      .slice(1)
                                      .toLowerCase()} ${user.firstname}`
                                  : "Lastname"
                              }
                              title={ticket.title}
                              time={`à: ${ticket.created_at.substring(5, 16)}`}
                              status={
                                ticket.closed_at
                                  ? "closed : " +
                                    ticket.closed_at.substring(5, 16)
                                  : ticket.status
                              }
                            />
                          ))}
                    </View>
                    {buttonlentickets && (
                      <Pressable
                        className="mx-auto w-3/4 text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-[#C8D9F0] active:bg-[#B4CBF0]"
                        onPress={() => {
                          setLentickets(lentickets + 3);
                          if (lentickets + 3 >= tickets.data.length) {
                            setButtonlentickets(false);
                          }
                        }}
                      >
                        <Text className="w-full text-center">
                          Afficher plus
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            </View>
            <View className="mt-10 mb-2">
              <View
                className="w-full"
                style={{
                  marginBottom: screenWidth < 768 ? 100 : 0,
                }}
              >
                <Text
                  className="text-lg rounded-lg text-center mb-10 py-2 px-3 bg-[#363D97] color-white"
                  style={{
                    fontSize: screenWidth < 768 ? 20 : 32,
                    marginTop: screenWidth < 768 ? "5%" : "8%",
                  }}
                >
                  Graphique de la semaine
                </Text>

                <View className="flex  mx-auto rounded-lg justify-center items-center">
                  {presentData && (
                    <GraphWeek
                      retardData={retardData}
                      absentData={absentData}
                      presentData={presentData}
                      distancielData={distancielData}
                    />
                  )}
                </View>
              </View>
            </View>
            <Text
              className="text-lg rounded-lg text-center mb-8 py-2 px-3 bg-[#363D97] color-white"
              style={{
                fontSize: screenWidth < 768 ? 20 : 32,
                marginTop: screenWidth < 768 ? "0%" : "8%",
              }}
            >
              Actions rapides
            </Text>
            <View className="flex flex-row flex-wrap justify-evenly w-full mb-12">
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
              <Pressable onPress={() => setChooseDate(true)}>
                <CardActions
                  title="Export"
                  image={require("./../../assets/logsIcon.png")}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <Navbar />
      </View>
    </View>
  );
}
