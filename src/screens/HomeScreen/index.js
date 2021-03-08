import React from 'react'
import {View, Text, Image} from 'react-native'

export default App = ({route, navigation}) => {

  console.log("Inside home page: "+ route.params.incomingUri);
  return(
    <View>
      <Text>Home Screen</Text>
      
        <Image
          style = {{width: 100, height: 100}}
          source={{
          uri: route.params.incomingUri,
        }}/>
    </View>
  );
}
