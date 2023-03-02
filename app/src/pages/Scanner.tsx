import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
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
  const [isLoading, setLoading] = useState(true); // chargement de la page

  const urlNo = [
    require("../../assets/the-rock-no.gif"),
    require("../../assets/gif_not_validate_2.gif"),
    require("../../assets/gif_not_validate_3.gif"),
    require("../../assets/gif_not_validate_4.gif"),
    require("../../assets/gif_not_validate_5.gif"),
    require("../../assets/gif_not_validate_6.gif"),
  ];

  const urlYes = [
    require("../../assets/the-rock-yes.gif"),
    require("../../assets/gif_validate_2.gif"),
    require("../../assets/gif_validate_3.gif"),
    require("../../assets/gif_validate_5.gif"),
  ];

  const [selectedURL, setSelectedURL]: any = useState(null);

  const selectRandomURLYes = () => {
    const randomIndex = Math.floor(Math.random() * urlYes.length);
    setSelectedURL(urlYes[randomIndex]);
  };

  const selectRandomURLNo = () => {
    const randomIndex = Math.floor(Math.random() * urlNo.length);
    setSelectedURL(urlNo[randomIndex]);
  };

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
        setLoading(false);
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
      selectRandomURLYes();

      setData(null);
      setScanned(false);
    }, 2000);

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text className="text-2xl mb-10 text-center border-2 w-[50%] text-green-500 bg-slate-200 border-green-500 rounded-xl mx-auto">
          QR code valide
        </Text>
        <Image
          source={selectedURL}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
        <Text className="text-center">{data[0]}</Text>
      </View>
    );
  }

  if (error) {
    setTimeout(() => {
      selectRandomURLNo();
      setData(null);
      setScanned(false);
      setError(false);
    }, 3000);

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text className="text-2xl mb-10 text-center border-2 w-[50%] text-red-400 bg-slate-200 border-red-300 rounded-xl mx-auto">
          QR code incorrect
        </Text>
        <Image
          source={selectedURL}
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
        {isLoading ? (
          <ScrollView className="w-full h-[300px] ml-5">
            <ActivityIndicator size="large" color="blue" className="mt-64" />
          </ScrollView>
        ) : (
          <View>
            <View
              className="flex flex-row justify-between items-center mt-10"
              style={{
                marginTop: screenWidth < 768 ? "15%" : 0,
                paddingRight: screenWidth < 768 ? 5 : 10,
              }}
            ></View>
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
        )}
      </View>
    );
  } else {
    return <Text>Permission rejected.</Text>;
  }
}
