import React from "react";
import { useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native'


export const DemoScreen = ({route, navigation})=> {

    function handleOpenURL(event) {
        console.log(event.url);
        const route = event.url.replace(/.*?:\/\//g, '');
        // do something with the url, in our case navigate(route)
      }

    useEffect(() => {
    
        Linking.addEventListener('url', handleOpenURL);
        return () => {
            Linking.removeEventListener('url', handleOpenURL);
        };
      });
    const name = route.params.name;
    return(
        <View style = {styles.containerStyle}>

            <Text>Welcome to demo screen: {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        justifyContent:"center" 
    }
})