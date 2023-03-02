import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Text,
  View,
} from "react-native";
import { checkUser } from "../../services/users/users.services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/fr";
import { checkLogs } from "../../services/logs/logs.services";

export default function Scanner({ navigation }: any) {
  const screenWidth = Dimensions.get("window").width;

  // Initialisation des états
  const [data, setData] = useState(null); // donnée à scanner
  const [permission, setPermission] = useState(true); // autorisation de caméra
  const [error, setError] = useState(false); // erreur lors du scan
  const [token, setToken] = useState<any>(); // token de l'utilisateur
  const [scanned, setScanned] = useState(false); // si le code a été scanné

  // Demande d'autorisation pour la caméra au lancement de l'application
  useEffect(() => {
    requestCameraPermission();
    AsyncStorage.getItem("token").then((value) => {
      if (value !== null) setToken(JSON.parse(value));
    });
  }, []);

  // Récupération de l'heure locale
  const [currentTime, setCurrentTime] = useState(
    moment().locale("fr").utcOffset("+0100").format("LT")
  );
  // Mise à jour de l'heure toutes les secondes
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(moment().locale("fr").utcOffset("+0100").format("LT"));
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  // Fonction de demande d'autorisation pour la caméra
  const requestCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
      console.log(`Status: ${status}, Granted: ${granted}`);

      if (status === "granted") {
        console.log("Access granted");
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.error(error);
      setPermission(false);
    }
  };

  if (data) {
    setTimeout(() => {
      setData(null);
      setScanned(false);
    }, 2000);

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text className="text-2xl mb-10 text-center text-green-500">
          QR code valide
        </Text>
        <Image
          source={require("../../assets/the-rock-yes.gif")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
         <Text className="text-center">{data[0]}</Text>
      </View>
    );
  }

  if (error) {
    setTimeout(() => {
      setData(null);
      setScanned(false);
      setError(false)
    }, 2000);

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text className="text-2xl mb-10 text-center text-red-500">
          QR code incorrect
        </Text>
        <Image
          source={require("../../assets/the-rock-no.gif")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
       
      </View>
    );
  }

  if (scanned) {
    return (
      <View className="mt-64">
        <Text className="text-center mb-10 text-xl">
          Vérification du QR code
        </Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (permission) {
    return (
      <View>
        <View
          className="flex flex-row justify-between items-center mt-10"
          style={{
            marginTop: screenWidth < 768 ? "15%" : 0,
            paddingRight: screenWidth < 768 ? 5 : 10,
          }}
        >
          {/* <Pressable
            className="pl-5 pr-5 pt-2 pb-2 bg-[#5863F8] rounded-2xl mr-12"
            style={{
              paddingLeft: screenWidth < 768 ? 5 : 10,
              paddingRight: screenWidth < 768 ? 5 : 10,
              paddingTop: screenWidth < 768 ? 5 : 10,
              paddingBottom: screenWidth < 768 ? 5 : 10,
              marginRight: screenWidth < 769 ? 10 : 20,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              className="text-2xl px-5 py-1 text-white"
              style={{
                fontSize: screenWidth < 768 ? 16 : 32,
              }}
            >
              Connexion
            </Text>
          </Pressable> */}
        </View>
        <Text
          className="mt-40 text-center text-5xl"
          style={{
            marginTop: screenWidth < 768 ? "20%" : 0,
          }}
        >
          {currentTime}
        </Text>
        <Text className=" text-center text-3xl w-3/4 m-auto mt-12 mb-10">
          Bonjour ! Veuillez scanner le QRcode
        </Text>
        <BarCodeScanner
          className="mt-10 w-full h-1/2"
          onBarCodeScanned={async ({ type, data }) => {
            setScanned(true);
            try {
              const dataParse: any = data.split("|"); // TODO ENLEVER LE ANY
              if (
                dataParse.length === 3 &&
                dataParse[0][dataParse[0].length - 2] === "_" &&
                /^\d+$/.test(dataParse[1]) &&
                /^\d+$/.test(dataParse[2])
              ) {
                if (await checkUser(dataParse[0], token)) {
                  const timezone = "Europe/Paris"; // UTC+1
                  const date = moment().tz(timezone).format("YYYY-MM-DD");
                  await checkLogs(dataParse[0], date); // TODO ENLEVER LES HEURES DE LA DATE
                  setData(dataParse);
                } else {
                  console.log("[FAIL] Login is not good");
                  throw new Error("[FAIL] Login is not good");
                }
              } else {
                console.log("[FAIL] QR Code is not good");
                throw new Error("[FAIL] QR Code is not good");
              }
            } catch (error) {
              setError(true);
              console.log(error);
            }
          }}
        ></BarCodeScanner>
        <View className="w-full h-36 bg-[#f2f2f2] z-10 bottom-0 absolute"></View>
      </View>
    );
  } else {
    return <Text>Permission rejected.</Text>;
  }
}
