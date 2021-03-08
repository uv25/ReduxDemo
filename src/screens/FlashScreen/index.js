import React, { useState, useEffect, useCallback } from 'react'
import {AppRegistry, View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";

import { useDispatch, useSelector } from "react-redux";
import rootReducer from "../../reducers";
import actions from "../../actions"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const buttonAction = () => {
  const dispatch = useDispatch();
  
  return (
    dispatch(actions.userActions.setUser({name: 'Adi'}))
  )
}

type SharedItem = {
  mimeType: string,
  data: string,
  extraData: any,
};

const Test = () => {
  const [sharedData, setSharedData] = useState(null);
  const [sharedMimeType, setSharedMimeType] = useState(null);

  const handleShare = useCallback((item: ?SharedItem) => {
    if (!item) {
      return;
    }

    const { mimeType, data, extraData } = item;

    setSharedData(data);
    setSharedMimeType(mimeType);
    // You can receive extra data from your custom Share View
    console.log(extraData);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
    console.log("Loaded Test...");
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);
    console.log("Loaded Test...");

    return () => {
      listener.remove();
    };
  }, []);

  if (!sharedMimeType && !sharedData) {
    // The user hasn't shared anything yet
    return null;
  }

  if (sharedMimeType === "text/plain") {
    // The user shared text
    return <Text>Shared text: {sharedData}</Text>;
  }

  if (sharedMimeType.startsWith("image/")) {
    // The user shared an image
    return (
      <View>
        <Text>Shared image:</Text>
        <Image source={{ uri: sharedData }} />
      </View>
    );
  }

  // The user shared a file in general
  return (
    <View>
      <Text>Shared mime type: {sharedMimeType}</Text>
      <Text>Shared file location: {sharedData}</Text>
    </View>
  );
};

const Share = () => {
  const [sharedData, setSharedData] = useState("");
  const [sharedMimeType, setSharedMimeType] = useState("");

  useEffect(() => {
    ShareMenuReactView.data().then(({ mimeType, data }) => {
      setSharedData(data);
      setSharedMimeType(mimeType);
      console.log("Loaded Share...");
    });
  }, []);

  return (
    <View>
      <Button
        title="Dismiss"
        onPress={() => {
          ShareMenuReactView.dismissExtension();
        }}
      />
      <Button
        title="Send"
        onPress={() => {
          // Share something before dismissing
          ShareMenuReactView.dismissExtension();
        }}
      />
      <Button
        title="Dismiss with Error"
        onPress={() => {
          ShareMenuReactView.dismissExtension("Something went wrong!");
        }}
      />
      <Button
        title="Continue In App"
        onPress={() => {
          ShareMenuReactView.continueInApp();
        }}
      />
      <Button
        title="Continue In App With Extra Data"
        onPress={() => {
          ShareMenuReactView.continueInApp({ hello: "from the other side" });
        }}
      />
      {sharedMimeType === "text/plain" && <Text>{sharedData}</Text>}
      {sharedMimeType.startsWith("image/") && (
        <Image source={{ uri: sharedData }} />
      )}
    </View>
  );
};

AppRegistry.registerComponent("Test", () => Test);
AppRegistry.registerComponent("ShareMenuModuleComponent", () => Share);


export const FlashScreen = ({navigation}) => {
  const user = useSelector(state => state.user)
  console.log('Just Checking: ' + user.user.name)

  const dispatch = useDispatch();
  var demoUser = {name: 'Adi'}
  var incomingFile;

  const localButtonAction = useCallback(
    () => dispatch(actions.userActions.setUser({name: 'Sanchit'})),
    [dispatch]
  )

  //dispatch(actions.userActions.setUser(demoUser))
  useEffect(()=> {
    //dispatch(actions.userActions.setUser(demoUser))
    ReceiveSharingIntent.getReceivedFiles(files => {
      // files returns as JSON Array example
      //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
      console.log("INside Receive Intents");
      console.log(files[0].contentUri);
      incomingFile = files[0].contentUri;
      if(incomingFile !== undefined)
      {
        console.log("Ab jump hoga");
        navigation.push("Home", {incomingUri: incomingFile});
      }
    }, 
    (error) =>{
      console.log(error);
    }, 
    'ShareMedia' // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
  })

  
  
  return(
    <View style = {styles.containerStyle}>
      <Text>Flash Screen</Text>
      <Text>User Name: {user.user.name}</Text>
      <Text>Logged In Status: {user.loggedIn?"true":"false"}</Text>
      

      <View style = {{backgroundColor: "red"}}>
        <TouchableOpacity
          style = {styles.buttonStyle}
          onPress = {()=> dispatch({type: "SET_USER_REQ", payload: {name: "Trisha"}})}>
          <Text style = {styles.buttonTextStyle}>Change User</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.buttonStyle}
          onPress = {()=> localButtonAction()}
          >
          <Text style = {{color: 'blue'}}>Change User A2</Text>
        </TouchableOpacity>
      </View>

      <View style = {{alignSelf: "flex-start", backgroundColor: "orange"}}>
        <TouchableOpacity
          style = {styles.buttonStyle}
          onPress = {()=> dispatch({type: "LOG_OUT_REQ"})}>
          
          <Text style = {{color: "red"}}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {() => {
          navigation.push("Demo", {name: "Udit"});
        }}>
          <Text>Demo page</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 5,
    padding: 10,
    width: 200,
    backgroundColor: 'green',
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  buttonTextStyle: {
    color: 'blue'
  },
  containerStyle: {
    padding: 10,
    backgroundColor: "yellow",
    flex: 1

  }
})