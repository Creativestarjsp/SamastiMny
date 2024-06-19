import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import More from '../screens/user/More';
import Matches from '../screens/user/Matches';
import Search from '../screens/user/Search';



const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <Tab.Navigator>
         <Tab.Screen name="Match" component={Matches}  options={{ headerShown: false}}/>
      <Tab.Screen name="More" component={More} options={{ headerShown: false }} />   
       <Tab.Screen name="Search" component={Search} options={{ headerShown: false}}/>   
   
   
    </Tab.Navigator>
  );
}
