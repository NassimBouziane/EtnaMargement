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

  return (
    <View style={{ flex: 1, width: width, height: height }}>
      <Image className="m-4" source={require("../../assets/etna-logo.png")} />
      <View className="flex w-[80%] h-[30%] mx-auto">
        <Image
          source={require("../../assets/login-illustration.png")}
          className="w-full h-full"
        />
      </View>
      <KeyboardAwareScrollView>
      <View className="flex w-[80%] h-full mx-auto">
        <Text className="text-[32px] mt-[20px]">Connexion</Text>
        
          <Text className="text-[15px] mt-[43px]">Login:</Text>
          <TextInput className="bg-[#D9D9D9] flex w-full h-[65px] rounded-lg mt-[10px] p-4"></TextInput>
          <Text className="text-[15px] mt-[34px]">Mot de passe:</Text>
          <View className="bg-[#D9D9D9] flex w-full h-[65px] rounded-lg mt-[10px] p-4">
            <TextInput className="" secureTextEntry={hidden}></TextInput>
          </View>
        
        <Pressable
          className="bg-[#5863F8] flext items-center justify-center w-full h-[42px] rounded-lg mt-[40px] active:bg-[#3940aa]"
          onPress={() => {}}
        >
          <Text className="text-white">Se Connecter</Text>
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
