import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Pressable,
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

  const [data, setData] = useState(null);
  const [permission, setPermission] = useState(true);
  const [error, setError] = useState(false);
  const [token, setToken] = useState<any>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestCameraPermission();
    AsyncStorage.getItem("token").then((value) => {
      if (value !== null) setToken(JSON.parse(value));
    });
  }, []);

  const [currentTime, setCurrentTime] = useState(
    moment().locale("fr").utcOffset("+0100").format("LT")
  );
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(moment().locale("fr").utcOffset("+0100").format("LT"));
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

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
    return (
      <View>
        <Text> {data[0]} </Text>
        <Text> {data[1]} </Text>
        <Text> {data[2]} </Text>
        <Button
          title="Scan again"
          onPress={() => {
            setData(null);
            setScanned(false);
          }}
        ></Button>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Wesh erreur</Text>
        <Button
          title="Scan again"
          onPress={() => {
            setError(false);
            setScanned(false);
          }}
        ></Button>
      </View>
    );
  }

  if (scanned) {
    return (
      <View>
        <Text>Check if QRcode is good</Text>
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
          className="mt-10 w-full h-1/2 bord"
          onBarCodeScanned={async ({ type, data }) => {
            setScanned(true);
            try {
              const dataParse = data.split("|");
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
