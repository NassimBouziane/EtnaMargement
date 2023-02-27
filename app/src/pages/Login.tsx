import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchUserConnected, postLogin } from "../../services/users/users.services";

const { height, width } = Dimensions.get("window");

// TODO : <Button title="reveal" onPress={() => {sethidden(current => !current)}}></Button>

export default function Login() {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const navigation: any = useNavigation();
  const [hidden, sethidden] = useState(true);
  const [destination, setDestination] = useState('Students')

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await AsyncStorage.removeItem("token");
      setDestination("Students");
  
      const res = await postLogin(nom, password);
      await AsyncStorage.setItem("token", JSON.stringify(res["set-cookie"]));
      
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const user = await fetchUserConnected(await JSON.parse(value));
        if (user.groups.includes("adm") || user.login == "") {
          console.log("jsuis la porte de derriere")
          setDestination("Home");
          navigation.navigate('Home')
        }
        else{
        navigation.navigate("Students");}

      }
    } catch (error) {
      Alert.alert("Mot de passe ou login incorrect(s)");
      console.log("[FAIL]", error);
    }
  };

  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            source={require("../../assets/etna-logo.png")}
            className="my-auto"
          />
        </View>
      ),
    });
  }, [navigation]);

  const lock = hidden
    ? require("../../assets/login_showpass_01.png")
    : require("../../assets/login_showpass_02.png");

  return (
    <View style={{ flex: 1, width: width, height: height }}>
      <View className="flex w-[80%] h-[30%] mx-auto mt-5">
        <Image
          source={require("../../assets/login-illustration.png")}
          className="w-full h-full"
        />
      </View>
      <KeyboardAwareScrollView>
        <View className="flex w-[80%] h-full mx-auto">
          <Text className="text-[32px] mt-[20px]">Connexion</Text>

          <Text className="text-[15px] mt-[43px]">Login:</Text>
          <View className="bg-[#D9D9D9] flex flex-row w-full h-[65px] rounded-lg mt-[10px] p-4">
            <Image source={require("../../assets/login_atsign.png")} className="w-[20px] h-[20px] mr-[10px] my-auto"></Image>
            <TextInput className="h-full w-full" 
              placeholder="carra_c"
              value={nom}
              onChangeText={(value) => setNom(value)}>       
            </TextInput>
          </View>
          <Text className="text-[15px] mt-[25px]">Mot de passe:</Text>
          <View className="bg-[#D9D9D9] flex flex-row w-full h-[65px] rounded-lg mt-[10px] p-4">
            <Image source={require("../../assets/login_lock.png")} className="w-[20px] h-[20px] mr-[10px] my-auto"></Image>
            <TextInput className="h-full w-[80%]" 
              secureTextEntry={hidden}
              placeholder="1234"
              value={password}
              onChangeText={(value) => setPassword(value)}
    ></TextInput>
            <Pressable className="ml-auto my-auto" onPress={() => {sethidden(current => !current)}}>
              <Image source={lock} className="w-[20px] h-[20px]"></Image>
            </Pressable>
          </View>
        
        <Pressable
          className="bg-[#5863F8] flext items-center justify-center w-full h-[42px] rounded-lg mt-[50px] active:bg-[#3940aa]"
          onPress={handleSubmit}
        >
          <Text className="text-white">Se Connecter</Text>
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
