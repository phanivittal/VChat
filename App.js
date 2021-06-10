import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton, HeaderTitle} from "@react-navigation/stack";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';



const Stack = createStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:"#2C6BED"},
  headerTitleStyle:{color:"white", alignSelf: 'center'},
  headerTintColor:"white",
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouterName="Home" screenOptions={globalScreenOptions}>
    <Stack.Screen   name="Login"  component={LoginScreen}/>
    <Stack.Screen   name="SignUp"  component={RegisterScreen}/>
    <Stack.Screen   name="Home"  component={HomeScreen}/>

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
