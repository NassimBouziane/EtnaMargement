/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

function App(): JSX.Element {
  const login = async () => {
    const response = await fetch('https://auth.etna-alternance.net/identity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: 'boular_t',
          password: 'Test1234',
        }),
      }).then((response) => console.log(response));
      const json = await response;
      console.log(json)
    }
  useEffect(() => {
    login();
  }, []);
  return (
    <View>
      <Text>Wesh</Text>
    </View>
  );
}

export default App;
