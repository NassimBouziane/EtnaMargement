import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getTicket } from "../../services/etna/etna.services";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import CardTicket from "../components/CardTicket";
import Navbar from "../components/Navbar";
import Ticketlarge from "../components/TicketLarge";

export default function Tickets() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState<any>("");
  const [chooseDate, setChooseDate] = useState(false);
  const [tickets, setTickets] = React.useState<any>();
  const [lentickets, setLentickets] = React.useState<any>(3);
  const [buttonlentickets, setButtonlentickets] = React.useState<any>(true);

  const UserInfo = async () => {
    const token: any = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    setUser(user);
    const tickets = await getTicket(await JSON.parse(token)).then((res) => {
      setTickets(res);
    });
  };

  useEffect(() => {
    UserInfo();
    // user change => re-render
  }, []);

  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 50); // Temps de chargement de 3 secondes
  }, []);

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <View className="flex flex-col h-full w-full ">
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="blue" className="mt-64" />
          ) : (
            <View>
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
                          time={`à: ${ticket.created_at.split(" ")[1]}`}
                          status={ticket.status}
                        />
                      ))}
                </View>
                {buttonlentickets && (
                  <Pressable
                    className="w-fit text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-gray-300 active:bg-slate-400"
                    onPress={() => {
                      setLentickets(lentickets + 3);
                      if (lentickets + 3 >= tickets.data.length) {
                        setButtonlentickets(false);
                      }
                    }}
                  >
                    <Text className="w-full text-center">Afficher plus</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </ScrollView>
        <Navbar />
      </View>
    </View>
  );
}
