import { Text, View } from "react-native";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <View>
      <Navbar/>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    </View>
  );
}
