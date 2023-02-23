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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get("window");

// TODO : <Button title="reveal" onPress={() => {sethidden(current => !current)}}></Button>

export default function Login() {
  const [hidden, sethidden] = useState(true);
  const navigation: any = useNavigation();
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
            <TextInput className="" placeholder="carra_c"></TextInput>
          </View>
          <Text className="text-[15px] mt-[25px]">Mot de passe:</Text>
          <View className="bg-[#D9D9D9] flex flex-row w-full h-[65px] rounded-lg mt-[10px] p-4">
            <Image source={require("../../assets/login_lock.png")} className="w-[20px] h-[20px] mr-[10px] my-auto"></Image>
            <TextInput className="" secureTextEntry={hidden} placeholder="1234"></TextInput>
            <Pressable className="ml-auto my-auto" onPress={() => {sethidden(current => !current)}}>
              <Image source={lock} className="w-[20px] h-[20px]"></Image>
            </Pressable>
            
          </View>
        
        <Pressable
          className="bg-[#5863F8] flext items-center justify-center w-full h-[42px] rounded-lg mt-[50px] active:bg-[#3940aa]"
          onPress={() => {}}
        >
          <Text className="text-white">Se Connecter</Text>
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
