import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Verify from '../screens/auth/Verify';

import Contact from '../screens/auth/Contact';
import Select from '../screens/auth/Select';


const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
      <Stack.Navigator>
     
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>  
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false}}/>
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Select" component={Select} />
        </Stack.Navigator>
      );
}





