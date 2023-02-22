/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Input } from 'react-native-elements';
import { postLogin } from '../../services/users/users.services';
import AsyncStorage from '@react-native-async-storage/async-storage'


function Login(): JSX.Element {
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(e : any) => {
    await postLogin(nom,password).then((res) => {
      console.log(res['set-cookie'])
      AsyncStorage.setItem('token',JSON.stringify(res['set-cookie']));
    })
    .catch((e) => {
      console.log('[FAIL]',e)
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

export default Login;
