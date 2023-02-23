import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React from "react";
import { Button, Text, View } from "react-native";

import Home from "./pages/Home";
import Login from "./pages/Login";
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
      <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen
          name="Login"
          component={Login}
          
          
        />
        <Stack.Screen
          name="Home"
          component={Home}
          
        />
        <Stack.Screen
          name="Logs"
          component={Logs}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
        />
        <Stack.Screen
          name="ScanMode"
          component={ScanMode}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          
        />
        <Stack.Screen
          name="Students"
          component={Student}
          
        />
        <Stack.Screen
          name="Tickets"
          component={Tickets}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
