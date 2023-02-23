import React, { useEffect, useState } from "react";
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import { Alert, Button, Text, View } from "react-native";
import { checkUser } from "../../services/users/users.services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scanner() {
  const [data, setData] = useState(null)
  const [permission, setPermission] = useState(true);
  const [error, setError] = useState(false)
  const [token, setToken] = useState<any>()
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    requestCameraPermission();
    AsyncStorage.getItem("token").then((value) => {  
      if(value !== null)
      setToken(JSON.parse(value)) })
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

  if(data){
    return (
      <View>
        <Text> {data[0]} </Text>
        <Text> {data[1]} </Text>
        <Text> {data[2]} </Text>
        <Button title="Scan again" onPress={() => {setData(null); setScanned(false)}}></Button>
      </View>
    )
  }

  if(error){
    return (
      <View>
        <Text>Wesh erreur</Text>
        <Button title="Scan again" onPress={() => { setError(false); setScanned(false)} }></Button>
      </View>
    )
  }

  if(scanned){
    return(
      <View>
        <Text>Check if QRcode is good</Text>
      </View>
    )
  }

  
  if (permission) {
    return (
        <BarCodeScanner
            onBarCodeScanned={ async ({ type, data }) => {
              setScanned(true)
                try {
                    const dataParse = data.split('|')
                    if (dataParse.length === 3 
                      && dataParse[0][dataParse[0].length - 2] === '_'
                      && /^\d+$/.test(dataParse[1])
                      && /^\d+$/.test(dataParse[2]) )
                      {
                        if (await checkUser('bnej', token)){
                          setData(dataParse)
                        }else{
                          console.log("[FAIL] Login is not good")
                          throw new Error("[FAIL] Login is not good")
                        }
                        
                      }else{
                        console.log("[FAIL] QR Code is not good")
                        throw new Error("[FAIL] QR Code is not good")
                      }
                } catch (error) {
                  setError(true)
                  console.log(error)
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