import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { checkUser } from "../../services/users/users.services";

export default function Scanner() {
  const [data, setData] = useState(null)
  const [permission, setPermission] = useState(true);
  const [error, setError] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
        const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
        console.log(`Status: ${status}, Granted: ${granted}`);

        if (status === 'granted') {
            console.log('Access granted');
            setPermission(true);
        } else {
            setPermission(false);
        }
    } catch (error) {
        console.error(error);
        setPermission(false);
    }
  };

  const callCheckUser = async (login : String) => {
    await setIsLogin(await checkUser(login))
  }

  if(data){
    return (
      <View>
        <Text> {data[0]} </Text>
        <Text> {data[1]} </Text>
        <Text> {data[2]} </Text>
        <Button title="Scan again" onPress={() => setData(null)}></Button>
      </View>
    )
  }

  if(error){
    return (
      <View>
        <Text>Wesh erreur</Text>
        <Button title="Scan again" onPress={() => setError(false)}></Button>
      </View>
    )
  }

  if (permission) {
    return (
        <BarCodeScanner
            onBarCodeScanned={({ type, data }) => {
                try {
                    console.log(type);
                    console.log(data);
                    const dataParse = data.split('|')
                    if (dataParse.length === 3 
                      && dataParse[0][dataParse[0].length - 2] === '_'
                      && /^\d+$/.test(dataParse[1])
                      && /^\d+$/.test(dataParse[2]) )
                      {
                        callCheckUser(dataParse[0])
                        if (isLogin){
                          setData(dataParse)
                        } else {
                          console.log("[FAIL] Login don't exist*")
                          throw new Error("[FAIL] Login don't exist")
                        }
                        
                      }else{
                        console.log("[FAIL] QR Code is not good")
                        throw new Error("[FAIL] QR Code is not good")

                      }

                } catch (error) {
                  setError(true)
                  Alert.alert("erreur ... erreur ... erreur tu as fait une erreur ... erreur")
                }
            }}
        >
        <Text >Scan the QR code.</Text>
        </BarCodeScanner>
    );
} else {
    return <Text >Permission rejected.</Text>;
}
}
