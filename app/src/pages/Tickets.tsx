import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  RefreshControl,
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

export default function Tickets() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = React.useState<any>("");
  const [tickets, setTickets] = React.useState<any>();
  const [lentickets, setLentickets] = React.useState<any>(3);
  const [buttonlentickets, setButtonlentickets] = React.useState<any>(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lenticketsclosed, setLenticketsclosed] = React.useState<any>(3);
  const [buttonlenticketsclosed, setButtonlenticketsclosed] = React.useState<any>(false);

  const UserInfo = async () => {
    const token: any = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    setUser(user);
    await getTicket(await JSON.parse(token)).then((res) => {
      setTickets(res)
      setLoading(false)
      if (3 >= res.data.filter((data: any) => data.closed_at === null).length) {
        setButtonlenticketsclosed(false);
      }else {
        setButtonlenticketsclosed(true);
      };
      if (3 >= res.data.filter((data: any) => data.closed_at !== null).length) {
        setButtonlentickets(false);
      }else {
        setButtonlentickets(true);
      };
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // reload data
    UserInfo();
    setLentickets(3);
    setLenticketsclosed(3);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    UserInfo();
    setLentickets(3);
    setLenticketsclosed(3);
    // user change => re-render
  }, []);

  // useEffect(() => {
  //   for (let ticket: any; ticket < tickets.length; ticket++) {
  //     if (ticket.closed_at !== null) {
  //       setTicketClosedLength(ticketClosedLength + 1);
  //     }
  //   }
  // });

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <View className="flex flex-col h-full w-full ">
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <View className=" mx-auto text-center w-10/12 mt-3 flex flex-row mb-3 justify-center items-center py-2 px-3 bg-[#363D97] rounded-xl">
              {/* <Text
                className="bg-red-500 text-white py-1 px-2 rounded-2xl"
                style={{
                  fontSize: screenWidth < 768 ? 14 : 32,
                }}
              >
                {tickets ? tickets.data.length : ""}
              </Text> */}
              <Text className="ml-5 text-xl text-white">Tickets en cours</Text>
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
              <View className="flex h-fit w-[90%] mx-auto mt-[10px] rounded-lg">
                <View style={{ alignSelf: "center" }}>
                  {tickets &&
                    tickets.data
                      .filter((data: any) => data.closed_at === null)
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
                              ? "closed : " + ticket.closed_at.substring(5, 16)
                              : ticket.status
                          }
                        />
                      ))}
                </View>
                {buttonlenticketsclosed && (
                  <View className="flex justify-center">
                    <Pressable
                      className="mx-auto w-3/4 text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-[#C8D9F0] active:bg-[#B4CBF0]"
                      onPress={() => {
                        setLenticketsclosed(lenticketsclosed + 3);
                        if (
                          lenticketsclosed + 3 >=
                          tickets.data.filter(
                            (data: any) => data.closed_at === null
                          ).length
                        ) {
                          setButtonlenticketsclosed(false);
                        }
                      }}
                    >
                      <Text className="text-center">Afficher plus</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>
          <View>
            <View className=" mx-auto text-center w-10/12 mt-3 flex flex-row mb-3 justify-center items-center py-2 px-3 bg-[#363D97] rounded-xl">
              <Text className="ml-5 text-xl text-white">Tickets fermés</Text>
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
              <View className="flex h-fit w-[90%] mx-auto mt-[10px] rounded-lg">
                <View style={{ alignSelf: "center" }}>
                  {tickets &&
                    tickets.data
                      .filter((data: any) => data.closed_at !== null)
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
                              ? "closed : " + ticket.closed_at.substring(5, 16)
                              : ticket.status
                          }
                        />
                      ))}
                </View>
                {buttonlentickets && (
                  <View className="flex justify-center">
                    <Pressable
                      className="mx-auto w-3/4 text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-[#C8D9F0] active:bg-[#B4CBF0]"
                      onPress={() => {
                        setLentickets(lentickets + 3);
                        if (lentickets + 3 >= tickets.data.length) {
                          setButtonlentickets(false);
                        }
                      }}
                    >
                      <Text className="text-center">Afficher plus</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
        <Navbar />
      </View>
    </View>
  );
}
