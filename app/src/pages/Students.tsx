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
  getUserByLogin,
} from "../../services/users/users.services";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import Navbar from "../components/Navbar";

export default function Student() {
  const navigation: any = useNavigation();
  const screen = Dimensions.get("window");
  const [user, setUser] = React.useState<any>("");

  const UserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token));
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token));
    //console.log(user);
    //const promo = await getPromo(await JSON.parse(token))
    //const lastNote = await getNote(await JSON.parse(token), user.login, promo[0].id.toString()).then((res) => res[res.length-1])
    //console.log(lastNote.activity_name)
    //console.log(lastNote.student_mark)
    setUser(user);
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
            <View className="flex w-[50%] mt-5 items-center justify-center">
              <Image source={require("../../assets/student-pp.png")} />
              <Text className="text-[16px] mt-5">{user.id ? user.id : ""}</Text>
            </View>
            <View className="flex w-[50%] h-fit gap-4 mr-5 my-auto">
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
                {user.formation ? user.formation : "AP2026"}
              </Text>
              <Text className="text-[11px]">
                {user.birthday ? user.birthday : "birthday"}
              </Text>
              
            </View>
            
          </View>
          <Image
              source={require("../../assets/rick-roll.png")}
              style={{width: 70, height: 70}}
              className="absolute bottom-5 right-5"
            />
          
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
