import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { getNote, getPromo } from "../../services/etna/etna.services";
import {
  fetchUserConnected,
  getUserByLogin,
} from "../../services/users/users.services";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";
import Navbar from "../components/Navbar";

export default function Student() {
  return (
    <View className="flex flex-row h-full">
      <Navbar />
      <Text>Student Screen</Text>
      {/* <GraphDay></GraphDay>
      <GraphWeek></GraphWeek> */}
    </View>
  );
}
