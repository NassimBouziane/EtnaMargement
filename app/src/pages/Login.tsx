import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchUserConnected, postLogin } from "../../services/users/users.services";


const { height, width } = Dimensions.get("window");

export default function Login() {
  const [login, setLogin] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const navigation: any = useNavigation();
  const [hidden, sethidden] = useState(true);
  const [checked, setChecked] = useState(false);

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async () => {
    try {
      // Supprime l'ancien token stocké dans AsyncStorage
      await AsyncStorage.removeItem("token");

      // Récupère le token à partir des identifiants entrés
      const res = await postLogin(login, password);

      // Stocke le token dans AsyncStorage
      await AsyncStorage.setItem("token", JSON.stringify(res["set-cookie"]));

      // Récupère le token stocké dans AsyncStorage
      const value = await AsyncStorage.getItem("token");

      if (value !== null) {
        // Récupère les informations de l'utilisateur connecté
        const user = await fetchUserConnected(await JSON.parse(value));

        // Si la case "Se souvenir de moi" est cochée, stocke le login, le mot de passe et la valeur "true" dans AsyncStorage
        if(checked){
          await AsyncStorage.setItem("login", login);
          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem("remember", 'true');
        }else{
          // Sinon, supprime les informations stockées dans AsyncStorage
          await AsyncStorage.removeItem("login")
          await AsyncStorage.removeItem("password")
        }

        // Si l'utilisateur est un administrateur ou s'il s'agit de l'utilisateur "boular_t", redirige vers la page d'accueil, sinon redirige vers la page des étudiants
        if (user.groups.includes("adm") || user.login == "boular_t") {
          console.log("jsuis la porte de derriere")
          navigation.navigate('Home')
        }
        else {
          navigation.navigate("Students");
        }
      }
    } catch (error) {
      Alert.alert("Mot de passe ou login incorrect(s)");
      console.log("[FAIL]", error);
    }
  };

  // Fonction appelée au chargement de la page pour récupérer les informations stockées dans AsyncStorage
  const getRemember = async () => {
    const remember = await AsyncStorage.getItem('remember');
    if (remember === 'true') {
      const rememberedLogin = await AsyncStorage.getItem('login');
      const rememberedPassword = await AsyncStorage.getItem('password');
      if (rememberedLogin) {
        setLogin(rememberedLogin);
      }
      if (rememberedPassword) {
        setPassword(rememberedPassword);
      }else{
        setPassword('');
      }

    } else {
      setPassword('');
    }

    const token = await AsyncStorage.getItem('token');
    if (token && remember) {
      const user = await fetchUserConnected(JSON.parse(token));
      if (user.groups.includes('adm') || user.login === 'boular_t') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Students');
      }
    }
  };  
  
  useFocusEffect(
    React.useCallback(() => {
      getRemember();

      return () => {

      };
    }, [])
  );

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

  const lock = hidden
    ? require("../../assets/login_showpass_01.png")
    : require("../../assets/login_showpass_02.png");

  const check = checked ? require("../../assets/login_check.png") : "";

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
          <Text className="text-[32px] mt-[25px] mb-6">Connexion</Text>

          <View className="bg-[#D9D9D9] flex flex-row w-full h-[60px] rounded-lg mt-[10px] p-4 mb-4">
            <Image
              source={require("../../assets/login_atsign.png")}
              className="w-[20px] h-[20px] mr-[10px] my-auto"
            ></Image>
            <TextInput
              className="h-full w-full"
              placeholder="Login"
              value={login}
              onChangeText={(value) => setLogin(value)}
            ></TextInput>
          </View>
          <View className="bg-[#D9D9D9] flex flex-row items-center w-full h-[60px] rounded-lg mt-[10px] p-4">
            <Image
              source={require("../../assets/login_lock.png")}
              className="w-[20px] h-[20px] mr-[10px] my-auto"
            ></Image>
            <TextInput
              className="h-full w-[80%]"
              secureTextEntry={hidden}
              placeholder="Mot de passe"
              value={password}
              onChangeText={(value) => setPassword(value)}
            ></TextInput>
            <Pressable
              className="ml-auto my-auto"
              onPress={() => {
                sethidden((current) => !current);
              }}
            >
              <Image source={lock} className="w-[20px] h-[20px]"></Image>
            </Pressable>
          </View>
          <View className="flex flex-row items-center mt-[25px]">
            <View className="h-[32px] w-[32px] bg-[#D9D9D9] rounded-lg">
              <Pressable
                onPress={() => {
                  setChecked((current) => !current);
                }}
              >
                <Image
                  source={check}
                  className="w-[20px] h-[20px] ml-[6px] mt-[6px]"
                ></Image>
              </Pressable>
            </View>
            <Text className="text-[15px] ml-[5px] items-center text-center">
              Se souvenir de moi
            </Text>
          </View>

          <Pressable
            className="bg-[#5863F8] flext items-center justify-center w-full h-[42px] rounded-lg mt-[30px] active:bg-[#3940aa]"
            onPress={handleSubmit}
          >
            <Text className="text-white">Se Connecter</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
