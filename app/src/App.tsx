/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { postLogin } from './services/users/users.services';


function App(): JSX.Element {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(e : any) => {
    console.log(nom,password)
    await postLogin(nom,password).then((res) => {
      console.log(res['set-cookie']);
    })
    .catch(() => {
      console.log('fail')
    });
  }

  return (
    <View>
      <Input
        placeholder='Nom'
        value={nom}
        onChangeText={(value) => setNom(value)}
      />
      <Input
        placeholder='Mot de passe'
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Button title='Envoyer' onPress={handleSubmit} />
    </View>
  );
}

export default App;
