import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import Matches from '../screens/user/Matches';
import ViewProfile from '../screens/user/ViewProfile';
import ViewMore from '../screens/user/UpdateProfile';
import Chat from '../screens/user/Chat';
import TopTabNavigator from './topNavigator';
import PartnerPreferences from '../screens/user/Preferences';


const Stack = createStackNavigator();

export default function MatchesNavigator() {
    return (
        <Stack.Navigator>
       <Stack.Screen name="Matchess" component={TopTabNavigator}  options={{ headerTitle: 'Matches' }}/>
          <Stack.Screen name="Profile" component={Profile} />
       
        <Stack.Screen name="ViewProfiles" component={ViewProfile} options={{ headerTitle: 'Profile' }}/>
        <Stack.Screen name="Update" component={ViewMore} />
        <Stack.Screen name="Chat" component={Chat} />
         
        </Stack.Navigator>
      );
}





