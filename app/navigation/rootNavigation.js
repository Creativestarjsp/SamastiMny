import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import AuthNavigator from './authNavigation';
import UserNavigator from './userNavigation';
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { Add_Notifications, login } from '../redux/authActions';
import ButtomNavigator from './buttomNavigation';
import SplashScreen from 'react-native-splash-screen'
import BootSplash from "react-native-bootsplash";
import Toast from 'react-native-toast-message'

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function Root() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const dispatch = useDispatch();

 useEffect(() => {
  const checkToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      const storedToken = credentials?.password;

      if (storedToken) {
        dispatch(login(storedToken));
        // Simulate a delay using setTimeout
        setTimeout(() => {
          BootSplash.hide({ fade: true });
          console.log("BootSplash has been hidden successfully");
        }, 2000); // 5000 milliseconds (5 seconds)
      } else {
        // If no stored token, hide the splash screen immediately
        BootSplash.hide({ fade: true });
        console.log("BootSplash has been hidden successfully");
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  checkToken();
}, []);

  
  
  const showToast = (text1,text2) => {
    Toast.show({
      type: 'success',
      text1: text1,
      text2: text2
    });
  }
 

    useEffect(() => {
    const setupNotifications = async () => {
      // Initialize push notifications
      PushNotification.configure({
        onRegister: async function (token) {
          console.log('FCM TOKEN:', token.token);
       
          // Save the FCM token to AsyncStorage
      
        },
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
          // Handle the notification as needed
        },
        senderID: '404619725065',
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });

      // Register the device for remote messages
      await messaging().registerDeviceForRemoteMessages();

      // Get the FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      // Handle foreground messages
      messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground Notification Message:', remoteMessage);
        const { title, body } = remoteMessage.notification
        console.log(title, body)
        if (title, body) {
       
          showToast(title,body)
          data = {
            id: Date.now(),
            title: title,
            body:body
          }
             dispatch(Add_Notifications(data))
        }
       
        // Show a notification in the foreground
        PushNotification.localNotification({
          channelId: '123456', // Channel ID for Android
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
        });
      });
    };

    // Call the function to set up notifications
    setupNotifications();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('fcmtoken', value);
      console.log('FCM Token stored in AsyncStorage:', value);
    } catch (error) {
      console.error('Error saving FCM Token to AsyncStorage:', error);
    }
  };



  return (
    <NavigationContainer>
      {isAuthenticated ? <ButtomNavigator /> : <AuthNavigator />}
      <Toast />
    </NavigationContainer>
  );
}
