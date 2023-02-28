import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { getNote, getPromo } from "../../services/etna/etna.services";
import {
  fetchUserConnected,
  getPhoto,
  getUserByLogin,
} from "../../services/users/users.services";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import Navbar from "../components/Navbar";
import QRCODE from "../components/QRCode";

export default function Students() {
  const navigation: any = useNavigation();
  const screen = Dimensions.get("window");
  const [user, setUser] = React.useState<any>("");
  const [promo, setPromo] = React.useState<any>("");
  const [qr_value, setQr_value] = React.useState<any>("");

  const UserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    const promo = await getPromo(await JSON.parse(token));
    const qr_value = `${user.login}|${user.id}|${promo[0].id}`;
    //const promo = await getPromo(await JSON.parse(token))
    //const lastNote = await getNote(await JSON.parse(token), user.login, promo[0].id.toString()).then((res) => res[res.length-1])
    //console.log(lastNote.activity_name)
    //console.log(lastNote.student_mark)
    setUser(user);
    setPromo(promo[0]);
    setQr_value(qr_value);
  };

  useEffect(() => {
    UserInfo();
    // user change => re-render
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/etna-logo.png")}
            className="my-auto"
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView>
      <View className="flex mt-5">
        <View className="flex flex-row w-full h-fit ml-1">
          <Text className="font-medium text-[32px] mx-auto">
            Bienvenue, {user.firstname ? user.firstname : ""}
          </Text>
          <Pressable className="bg-[#5863F8] h-[45px] w-[125px] rounded-lg active:bg-[#3940aa] mx-auto">
            <Text className="text-white text-[15px] my-auto mx-auto ">
              Se déconnecter
            </Text>
          </Pressable>
        </View>
        <View className="flex h-[270px] w-[95%] mx-auto bg-[#E3E3E3] mt-[50px] rounded-lg">
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
              <Text className="text-[16px] mt-5">{user.id ? user.id : ""}</Text>
            </View>
            <View className="flex w-[50%] h-fit gap-4 mr-5 mt-2">
              <Text className="text-[11px]">
                {user.lastname ? user.lastname : ""}
              </Text>
              <Text className="text-[11px]">
                {user.firstname ? user.firstname : ""}
              </Text>
              <Text className="text-[11px]">
                {user.email ? user.email : ""}
              </Text>
              <Text className="text-[11px]">
                {promo.wall_name ? promo.wall_name : ""}
              </Text>
              <Text className="text-[11px]">
                {user.birthday ? user.birthday : "birthday"}
              </Text>
            </View>
          </View>
          <View className="absolute bottom-5 right-5">
            <QRCODE
              value={
                qr_value
                  ? qr_value
                  : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              }
              className="absolute"
            />
          </View>
        </View>
        <View className="flex h-[300px] w-[95%] mx-auto bg-[#E3E3E3] mt-[50px] rounded-lg">
          <Text className="text-[32px] my-auto mx-auto">
            Mon graphique de la semaine
          </Text>
        </View>

        <View className="flex h-[600px] w-[95%] mx-auto bg-[#E3E3E3] mt-[50px] rounded-lg">
          <Text className="text-[32px] my-auto mx-auto">Mes Tickets</Text>
        </View>
        <View className="flex h-[600px] w-[95%] mx-auto bg-[#E3E3E3] mt-[50px] rounded-lg">
          <Text className="text-[32px] my-auto mx-auto">Mur Promo</Text>
        </View>
      </View>
    </ScrollView>
  );
}
