import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import HomeSVG from '../Assets/Icons/HomeSvg';
import HomefSvg from '../Assets/Icons/HomefSvg';
import PlanetSvg from '../Assets/Icons/PlanetSvg';

import PlanetfSvg from '../Assets/Icons/PlanetfSvg';

import TopTabNavigator from './topNavigator';
import Home from '../screens/user/Home';
import Inbox from '../screens/user/Inbox';
import ConnectionRequests from '../screens/user/ConnectionsRequest';
import UserNavigator from './userNavigation';
import MatchesNavigator from './matchesNavigation';
import InboxNavigator from './InboxNavigaton';
import Packages from '../screens/user/Packages';




export default function ButtomNavigator() {
  const Tab = createBottomTabNavigator();

  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          
          let iconComponent;

          // Set the icon based on the route name
          if (route.name === 'MainHome') {
            // Use your custom HomeSVG component for the Home tab
            iconComponent = focused ? <HomefSvg fill="#642B73" width={size} height={size} /> : <HomeSVG fill="grey" width={size} height={size} /> ;
          } else if (route.name === 'Matches') {
            // Use Ionicons for the Profile tab as before
          
            iconComponent = focused? <PlanetfSvg fill="#642B73" width={size} height={size}/>:<PlanetSvg fill="grey" width={size} height={size}/>;
          }
          else if (route.name === 'Inbox') {
            // Use Ionicons for the Profile tab as before
            const iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            iconComponent = <Ionicons name={iconName} size={size} color={color} />;
          }
             else if (route.name === 'Packages') {
            // Use Ionicons for the Profile tab as before
            const iconName = focused ? 'shopping-package' : 'shopping-package';
            iconComponent = <Fontisto name={iconName} size={size} color="#ffc60a" />; }
          else if (route.name === 'Profile') {
            // Use Ionicons for the Profile tab as before
            const iconName = focused ? 'people' : 'people-outline';
            iconComponent = <Ionicons name={iconName} size={size} color={color} />;   }

          // Return the icon component
          return iconComponent;
        },
        tabBarActiveTintColor: '#642B73', // Set active tab text color
        tabBarInactiveTintColor: 'grey', // Set inactive tab text color
        tabBarStyle: {
          display: 'flex', // Example style for the tabBar
        },
      })}
    >

      <Tab.Screen name="MainHome" component={UserNavigator}    options={{ headerShown: false,tabBarLabel: 'Home',}}/>
      <Tab.Screen name="Matches" component={MatchesNavigator}  options={{ headerShown: false}}/>
      <Tab.Screen name="Inbox" component={InboxNavigator}  options={{ headerShown: false}}/>
      <Tab.Screen name="Profile" component={ConnectionRequests} options={{ title: "Requests" }} />
      <Tab.Screen name="Packages" component={Packages}  options={{ title:"Packages"}} />
     
    </Tab.Navigator>
  );
}
