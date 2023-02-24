import React from "react";
import { Text, View } from "react-native";
import GraphDay from "../components/GraphDay";
import GraphWeek from "../components/GrapWeek";

export default function Student() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Student Screen</Text>
      <GraphDay></GraphDay>
      <GraphWeek></GraphWeek>
    </View>
  );
}