import 'react-native-gesture-handler';
import React from 'react'
import { Linking } from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {FlashScreen} from '../screens/FlashScreen'
import HomeScreen from "../screens/HomeScreen";
import {DemoScreen} from "../screens/DemoScreen";


 const MainStackNavigator = () => {

  const Stack = createStackNavigator();

  const deepLink = {
    prefixes: ['example.com', 'LoginWithRedux://'],
    config: {
      Flash: 'FlashPath',
      Demo: {
        path: 'Demo/:name',
        params: {name: null}
      }
    }
  }

  return (
    <NavigationContainer linking = {deepLink}>
      <Stack.Navigator initialRouteName='Flash'>
        <Stack.Screen name="Flash" component= {FlashScreen} />
        <Stack.Screen name="Home" component= {HomeScreen} />
        <Stack.Screen name= "Demo" component= {DemoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
