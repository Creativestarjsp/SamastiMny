import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import Matches from '../screens/user/Matches';
import ViewProfile from '../screens/user/ViewProfile';
import ViewMore from '../screens/user/UpdateProfile';
import Chat from '../screens/user/Chat';
import Inbox from '../screens/user/Inbox';


const Stack = createStackNavigator();

export default function InboxNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Messages" component={Inbox} />  
         
         <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      );
}





