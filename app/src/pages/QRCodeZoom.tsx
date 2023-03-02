import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Image } from "react-native";
import { fetchUserConnected } from "../../services/users/users.services";
import QRCODE from "../components/QRCode";
import { useNavigation } from "@react-navigation/native";

export default function Messages() {
  const [isLoading, setLoading] = useState(true);
  const [qr_value, setQr_value] = useState("");
  const navigation = useNavigation();

  const UserInfo = async () => {
    const token: any = await AsyncStorage.getItem("token");
    const user = await fetchUserConnected(await JSON.parse(token));
    setQr_value(user.login);
  };

  useEffect(() => {
    UserInfo();
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 500); // Temps de chargement de 500ms
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/logoEtna.png")}
            className=" ml-5 "
            style={{ width: 96, height: 30 }}
          />
        </View>
      ),
    });
  }, [navigation]);

  // Afficher un écran de chargement avec un spinner tant que isLoading est vrai
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View className="">
          
          <QRCODE
            value={
              qr_value
                ? qr_value
                : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            }
            size={200}
            className="absolute"
          />
        </View>
      )}
    </View>
  );
}
