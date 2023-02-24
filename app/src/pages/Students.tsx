import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { getNote, getPromo } from "../../services/etna/etna.services";
import { fetchUserConnected, getUserByLogin } from "../../services/users/users.services";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";

export default function Student() {

  const consoleNote = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await fetchUserConnected(await JSON.parse(token))
    const promo = await getPromo(await JSON.parse(token))
    const lastNote = await getNote(await JSON.parse(token), user.login, promo[0].id.toString()).then((res) => res[res.length-1])
    console.log(lastNote.activity_name)
    console.log(lastNote.student_mark)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Student Screen</Text>
      <GraphDay></GraphDay>
      <GraphWeek></GraphWeek>
      <Button title='test' onPress={consoleNote}></Button>
    </View>
  );
}