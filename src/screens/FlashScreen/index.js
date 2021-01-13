import React, {useCallback, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { useDispatch, useSelector } from "react-redux";
import rootReducer from "../../reducers";
import actions from "../../actions"

const buttonAction = () => {
  const dispatch = useDispatch();
  
  return (
    dispatch(actions.userActions.setUser({name: 'Adi'}))
  )
}


export default App = () => {
  const user = useSelector(state => state.user)
  console.log('Just Checking: ' + user.user.name)

  const dispatch = useDispatch();
  var demoUser = {name: 'Adi'}

  const localButtonAction = useCallback(
    () => dispatch(actions.userActions.setUser({name: 'Sanchit'})),
    [dispatch]
  )

  //dispatch(actions.userActions.setUser(demoUser))
  useEffect(()=> {
    //dispatch(actions.userActions.setUser(demoUser))
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