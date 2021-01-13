import 'react-native-gesture-handler';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FlashScreen from '../screens/FlashScreen'
import HomeScreen from "../screens/HomeScreen";


 const MainStackNavigator = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Flash'>
        <Stack.Screen name="Flash" component= {FlashScreen} />
        <Stack.Screen name="Home" component= {HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator
