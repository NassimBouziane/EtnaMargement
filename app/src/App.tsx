import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React from "react";
import { Button, Text, View } from "react-native";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import LogsInfo from "./pages/LogsInfo";
import Messages from "./pages/Messages";
import ScanMode from "./pages/ScanMode";
import Scanner from "./pages/Scanner";
import Settings from "./pages/Settings";
import StudentsAdminDetails from "./pages/StudentAdminDetails";
import Students from "./pages/Students";
import StudentsAdmin from "./pages/StudentsAdmin";
import Tickets from "./pages/Tickets";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Logs"
          component={LogsInfo}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="ScanMode"
          component={ScanMode}
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />



        <Stack.Screen
          name="Students"
          component={Students}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Tickets"
          component={Tickets}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Etudiants"
          component={StudentsAdmin}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Detail"
          component={StudentsAdminDetails}
          options={{
            headerShown: true,
            animation: "none",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
