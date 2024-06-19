import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import Matches from '../screens/user/Matches';
import ViewProfile from '../screens/user/ViewProfile';
import ViewMore from '../screens/user/UpdateProfile';
import Chat from '../screens/user/Chat';
import ImageUpload from '../screens/user/imageUpload';
import PartnerPreferences from '../screens/user/Preferences';
import Notifications from '../screens/user/Notifications';


const Stack = createStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>  
          <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Matches" component={Matches} />
        <Stack.Screen name="ViewProfiles" component={ViewProfile}  options={{ headerShown: false}}/>
        <Stack.Screen name="Update" component={ViewMore} />
        <Stack.Screen name="Image" component={ImageUpload} />
        <Stack.Screen name="Preferences" component={PartnerPreferences} />
          <Stack.Screen name="Notifications" component={Notifications}  />
        
        </Stack.Navigator>
      );
}





