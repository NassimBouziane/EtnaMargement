import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  getMessage,
  getNote,
  getPromo,
  getTicket,
  getWall,
  getWallByName,
} from "../../services/etna/etna.services";
import { getLogsByLogin } from "../../services/logs/logs.services";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import CardTicket from "../components/CardTicket";
import GraphStudent from "../components/GraphStudent";
import QRCODE from "../components/QRCode";

export default function Students() {
  const screenWidth = Dimensions.get("window").width;
  const navigation: any = useNavigation();
  const screen = Dimensions.get("window");
  const [user, setUser] = React.useState<any>("");
  const [promo, setPromo] = React.useState<any>("");
  const [qr_value, setQr_value] = React.useState<any>("");
  const [tickets, setTickets] = React.useState<any>();
  const [lentickets, setLentickets] = React.useState<any>(3);
  const [buttonlentickets, setButtonlentickets] = React.useState<any>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataGraph, setDataGraph] = React.useState<any>([]);
  const [grades, setGrades] = React.useState<any>([
    ["Activity 1: ", "14/20"],
    ["Activity 2: ", "16/20"],
    ["Activity 3: ", "20/20"],
  ]);
  const [finalMessagesList, setFinalMessagesList] = React.useState<any>([
    ["1", "title 1", "user 1", "content 1"],
    ["2", "title 2", "user 2", "content 2"],
    ["3", "title 3", "user 3", "content 3"],
    ["4", "title 4", "user 4", "content 4"],
    ["5", "title 5", "user 5", "content 5"],
  ]);

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

  const UserInfo = async () => {
    const token: any = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    const promo = await getPromo(await JSON.parse(token));
    const qr_value = `${user.login}|${user.id}|${promo[0].id}`;
    const tickets = await getTicket(await JSON.parse(token)).then((res) => {
      setTickets(res);
    });

    await getLogsByLogin(user_logs.login).then((res) => {
      console.log(res.data);
      const max =
        Number(res.data.Present) +
        Number(res.data.Absent) +
        Number(res.data.Retard) +
        Number(res.data.Distanciel);
      const even_max = (x: number) => {
        let y = Math.ceil(x / 4) * 4; // Round up x/4 and multiply by 4 to get closest multiple of 4
        if (y % 2 !== 0) {
          // If y is odd, add 2 to make it even
          y += 2;
        }
        return y;
      };
      setDataGraph([
        res.data.Present,
        res.data.Absent,
        res.data.Retard,
        res.data.Distanciel,
        even_max(max),
      ]);
    });

    const wall = await getWall(await JSON.parse(token));
    const wallByName = await getWallByName(
      wall[0],
      0,
      5,
      await JSON.parse(token)
    );
    const messagelist = async () => {
      const idAndTitle = [];
      const messagesUserAndContent = [];
      for (let i = 0; i < 5; i++) {
        idAndTitle.push([wallByName.hits[i].id, wallByName.hits[i].title]);
        const messageContent = await getMessage(
          idAndTitle[i][0],
          await JSON.parse(token)
        );
        messagesUserAndContent.push([
          messageContent[0].user,
          messageContent[0].content,
        ]);
      }
      const finalMessagesList = [];
      for (let i = 0; i < 5; i++) {
        finalMessagesList.push([
          idAndTitle[i][0],
          idAndTitle[i][1],
          messagesUserAndContent[i][0],
          messagesUserAndContent[i][1],
        ]);
      }
      setFinalMessagesList(finalMessagesList);
    };

    messagelist();
    
    const grades = await getNote(
      await JSON.parse(token),
      user.login,
      promo[0].id.toString()
    ).then((res) => {
      // get 3 last grades and put grades.activity_name in grades[i][i] and  grades.grade in grades[i][i+1] like this ["Activity 1: ", "14/20"]
      res = res.slice(Math.max(res.length - 3, 1));
      let grades = [];
      for (let i = 0; i < res.length; i++) {
        const mark = res[i].student_mark
          ? res[i].student_mark + "/" + res[i].maximal
          : "indisponible";
        grades.push([res[i].activity_name + ": ", mark]);
      }
      setGrades(grades);
    });
    setUser(user);
    setPromo(promo[0]);
    setQr_value(qr_value);
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("remember");
  };

  useEffect(() => {
    UserInfo();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View></View>,
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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View className="flex mt-5">
        <View className="flex flex-row w-full h-fit ml-1">
          <Text className="text-[32px] mx-auto">
            Bienvenue,{" "}
            {user.firstname ? user.firstname.replace(/Ã«/g, "ë") : ""}
          </Text>
        </View>
        <View className="flex mt-10 w-[90%] mx-auto rounded-lg justify-center items-center">
          <Text className="text-lg w-[95%] rounded-lg text-center py-2 px-3 bg-[#363D97] color-white">
            Carte étudiante Digitale
          </Text>
        </View>
        <View className="flex h-[270px] w-[95%] mx-auto bg-[#E3E3E3] mt-[20px] rounded-lg">
          <View className="flex flex-row justify-evenly w-full h-[64px] bg-[#5863F8]">
            <Text className="text-[11px] text-white w-[88px] h-fit text-center my-auto">
              Carte étudiante des métiers
            </Text>
            <Image
              source={require("../../assets/etna-logo-white.png")}
              className="my-auto w-[187px]"
            />
          </View>
          <View className="flex flex-row w-full h-fit">
            <View className="flex w-[50%] items-center justify-center">
              <Image
                source={{
                  uri: `https://auth.etna-alternance.net/api/users/${user.login}/photo`,
                }}
                style={{ width: "50%", height: "60%" }}
              />
              <Text className="text-[16px] mt-5">
                {user.id ? user.id : "XXXXX"}
              </Text>
            </View>
            <View className="flex w-[50%] h-fit gap-4 mr-5 mt-2">
              <Text className="text-[11px]">
                {user.lastname ? user.lastname : "Lastname"}
              </Text>
              <Text className="text-[11px]">
                {user.firstname
                  ? user.firstname.replace(/Ã«/g, "ë")
                  : "Firstname"}
              </Text>
              <Text className="text-[11px]">
                {user.email ? user.email : "email@etna-alternance.net"}
              </Text>
              <Text className="text-[11px]">
                {promo.wall_name ? promo.wall_name : "APX-XXXX"}
              </Text>
            </View>
          </View>
          <Pressable
            className="absolute bottom-3 right-5"
            onPress={() => {
              navigation.navigate("QR Details");
            }}
          >
            <QRCODE
              value={
                qr_value
                  ? qr_value
                  : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              }
              size={70}
              className="absolute"
            />
            <Text className="text-[8px] text-center underline">Zoom</Text>
          </Pressable>
        </View>
        <View className="flex h-[300px] w-[95%] mx-auto rounded-lg justify-center items-center">
          <Text className="text-lg w-[90%] rounded-lg text-center mb-6 py-2 px-3 bg-[#363D97] color-white">
            Dernières notes
          </Text>
          <View className="w-[90%] bg-[#D9D9D9] rounded-lg">
            {
              /* map grades and display them*/
              grades
                ? grades.map((grade: any, index: any) => {
                    return (
                      <View
                        key={index}
                        className="flex flex-row w-full h-[50px] justify-between items-center"
                      >
                        <View className="flex flex-row w-full h-fit">
                          <Text className="text-[14px] w-full text-center">
                            {grade}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null
            }
          </View>
        </View>
        <View className="flex h-[300px] w-[95%] mx-auto mt-[25px] rounded-lg justify-center items-center">
          <Text className="text-lg w-[90%] rounded-lg text-center mb-6 py-2 px-3 bg-[#363D97] color-white">
            Graphique de Présence
          </Text>

          <GraphStudent dataGraph={dataGraph ? dataGraph : [0, 0, 0, 0, 0]} />
        </View>
        <View className="flex flex-row mb-1 w-[90%] mt-[50px] justify-center mx-auto items-center py-2 px-3 bg-[#363D97] rounded-xl">
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
              className="w-[80%] mx-auto text-lg text-center mt-2 py-2 px-2 rounded-2xl bg-[#C8D9F0] active:bg-[#B4CBF0]"
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

        <View className="flex flex-row mb-1 w-[95%] mt-[50px] justify-center mx-auto items-center py-2 px-3 bg-[#363D97] rounded-xl">
          <Text
            className="bg-red-500 text-white py-1 px-2 rounded-2xl"
            style={{
              fontSize: screenWidth < 768 ? 14 : 32,
            }}
          >
            5
          </Text>
          <Text className="ml-5 text-xl text-white">Messages</Text>
        </View>
        <View className="flex h-fit w-[95%] italic mx-auto mt-[10px] rounded-lg bg-[#E3E3E3]">
          <Text>Les messages mettent un temps fou à s'afficher merci d'être patient et/ou refresh la page</Text>
        </View>

        <View className="flex h-fit w-[95%] mx-auto bg-[#E3E3E3] mt-[20px] rounded-lg">
          <View className="flex w-full flex-row mt-[10px]">
            <Image
              className="rounded-lg  m-2"
              source={{
                uri: `https://auth.etna-alternance.net/api/users/${
                  finalMessagesList ? finalMessagesList[0][2] : ""
                }/photo`,
              }}
              style={{ width: 60, height: 80 }}
            />
            <View className="w-full">
              <Text className="font-bold w-full" style={{width:200}}>
                {finalMessagesList ? finalMessagesList[0][1] : "Title"}
              </Text>
              <Text className="w-full text-[11px]" style={{width:300}}>
                {finalMessagesList ? finalMessagesList[0][3] : "Message"}
              </Text>
            </View>
          </View>
          <View className="flex w-full flex-row mt-[10px]">
            <Image
              className="rounded-lg  m-2"
              source={{
                uri: `https://auth.etna-alternance.net/api/users/${
                  finalMessagesList ? finalMessagesList[1][2] : ""
                }/photo`,
              }}
              style={{ width: 60, height: 80 }}
            />
            <View className="w-full">
              <Text className="font-bold w-full" style={{width:200}}>
                {finalMessagesList ? finalMessagesList[1][1] : "Title"}
              </Text>
              <Text className="w-full text-[11px]" style={{width:300}}>
                {finalMessagesList ? finalMessagesList[1][3] : "Message"}
              </Text>
            </View>
          </View>
          <View className="flex w-full flex-row mt-[10px]">
            <Image
              className="rounded-lg  m-2"
              source={{
                uri: `https://auth.etna-alternance.net/api/users/${
                  finalMessagesList ? finalMessagesList[2][2] : ""
                }/photo`,
              }}
              style={{ width: 60, height: 80 }}
            />
            <View className="w-full">
              <Text className="font-bold w-full" style={{width:200}}>
                {finalMessagesList ? finalMessagesList[2][1] : "Title"}
              </Text>
              <Text className="w-full text-[11px]" style={{width:300}}>
                {finalMessagesList ? finalMessagesList[2][3] : "Message"}
              </Text>
            </View>
          </View>
          <View className="flex w-full flex-row mt-[10px]">
            <Image
              className="rounded-lg  m-2"
              source={{
                uri: `https://auth.etna-alternance.net/api/users/${
                  finalMessagesList ? finalMessagesList[3][2] : ""
                }/photo`,
              }}
              style={{ width: 60, height: 80 }}
            />
            <View className="w-full">
              <Text className="font-bold w-full" style={{width:200}}>
                {finalMessagesList ? finalMessagesList[3][1] : "Title"}
              </Text>
              <Text className="w-full text-[11px]" style={{width:300}}>
                {finalMessagesList  ? finalMessagesList[3][3] : "Message"}
              </Text>
            </View>
          </View>

          <View className="flex w-full flex-row mt-[10px]">
            <Image
              className="rounded-lg  m-2"
              source={{
                uri: `https://auth.etna-alternance.net/api/users/${
                  finalMessagesList ? finalMessagesList[4][2] : ""
                }/photo`,
              }}
              style={{ width: 60, height: 80 }}
            />
            <View className="w-full">
              <Text className="font-bold w-full" style={{width:200}}>
                {finalMessagesList ? finalMessagesList[4][1] : "Title"}
              </Text>
              <Text className="w-full text-[11px]" style={{width:300}}>
                {finalMessagesList ? finalMessagesList[4][3] : "Message"}
              </Text>
            </View>
          </View>
          
        </View>

        <Pressable
          onPress={() => {
            logOut().then(() => navigation.navigate("Login"));
          }}
          className="x mx-auto"
        >
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/logoutIcon.png")}
              className="w-6 h-8 mr-2"
            />
            <Text className="my-5 text-xl text-center">Se déconnecter</Text>
          </View>
        </Pressable>
      </View>
      
    </ScrollView>
  );
}