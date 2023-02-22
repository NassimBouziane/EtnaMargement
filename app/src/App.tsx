import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React from "react";
import { Button, Text, View } from "react-native";

import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Messages from "./pages/Messages";
import ScanMode from "./pages/ScanMode";
import Scanner from "./pages/Scanner";
import Settings from "./pages/Settings";
import Student from "./pages/Students";
import Tickets from "./pages/Tickets";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Logs"
          component={Logs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScanMode"
          component={ScanMode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Students"
          component={Student}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tickets"
          component={Tickets}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
