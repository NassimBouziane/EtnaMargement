/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, Text, View } from 'react-native';
import { postLogin } from './services/users/users.services';


function App(): JSX.Element {

  const handleSubmit = async(e : any) => {
    await postLogin('boular_t','Test1234').then((res) => {
      console.log(res['set-cookie']);
    })
    .catch(() => {
      console.log('fail')
    });
  }

  return (
    <View>
      <Text>Wesh</Text>
      <Button onPress={handleSubmit} title="weshlazone"></Button>
    </View>
  );
}

export default App;
