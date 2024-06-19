/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App'; // Assuming your App component is in the same directory as index.js
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
