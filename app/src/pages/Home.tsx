import React from "react";
import { Button, Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Home({ navigation }: any) {
  return (
    <View className="flex flex-row h-full my-12">
      <Navbar />
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go scan"
          onPress={() => navigation.navigate("Scanner")}
        />
      </View>
    </View>
  );
}
