import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, Dimensions, Image, Text, View } from "react-native";
import { getNote, getPromo } from "../../services/etna/etna.services";
import { fetchUserConnected, getUserByLogin } from "../../services/users/users.services";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import Navbar from "../components/Navbar";

export default function Student() {
  const navigation: any = useNavigation();
  const screen = Dimensions.get("window");
  const [user, setUser] = React.useState<any>(null)


  const UserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const user_logs = await fetchUserConnected(await JSON.parse(token))
    const user = await getUserByLogin(user_logs.login, await JSON.parse(token))
    //const promo = await getPromo(await JSON.parse(token))
    //const lastNote = await getNote(await JSON.parse(token), user.login, promo[0].id.toString()).then((res) => res[res.length-1])
    //console.log(lastNote.activity_name)
    //console.log(lastNote.student_mark)
    setUser(user)
  }

  useEffect(() => {
    UserInfo()
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image source={require("../../assets/etna-logo.png")} className="my-auto" />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View className="flex flex-row " style={{width: screen.width < 768 ? "90%" : "80%",
    height: screen.height < 768 ? "100%" : "93%",}}>
      <View className="flex w-full h-full">
        <Text>Bienvenue, {user.firstname}</Text>
      
        <View  className="flex w-[80%] h-[40%] mx-auto rounded-lg mt-5"><GraphWeek></GraphWeek></View>
      </View>
      
    </View>
  );
}