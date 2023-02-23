import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchUserConnected, postLogin } from "../../services/users/users.services";

const { height, width } = Dimensions.get("window");

// TODO : <Button title="reveal" onPress={() => {sethidden(current => !current)}}></Button>

export default function Login() {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('')
  const navigation: any = useNavigation();
  const [hidden, sethidden] = useState(true);
  const [destination, setDestination] = useState('Students')
  const [message, setMessage] = useState('')

  const handleSubmit = async(e : any) => {
    setMessage('')
    setDestination('Students')
    await postLogin(nom,password).then((res) => {
      AsyncStorage.setItem('token',JSON.stringify(res['set-cookie']));
      setMessage('')
    })
    .catch((e) => {
      setMessage('Login or password false')
      console.log('[FAIL]',e)
    });
    AsyncStorage.getItem("token").then((value) => {
      if(value !== null)
      setToken(JSON.parse(value)) })
    await fetchUserConnected( token ).then((res) => {
      res.groups.forEach((element: string) => {
        if( element === 'adm' ) { setDestination('Home')}
      });
    })
    if(!message){
      navigation.navigate(destination)
    }
  }

  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
        <Image source={require("../../assets/etna-logo.png")} className="my-auto" />
        </View>
      ),
    });
  }, [navigation]);

  const lock = hidden ? require("../../assets/login_showpass_01.png") : require("../../assets/login_showpass_02.png");

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
            <TextInput className="h-full w-full" 
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
