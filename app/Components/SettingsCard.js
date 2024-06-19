import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import colors from '../Assets/Colors/Colors';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import profileApi from '../Services/Api/profileApi';

export default function SettingsCard() {
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSMSNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const navigation = useNavigation();

 const [isComponentMounted, setIsComponentMounted] = useState(false);

useEffect(() => {
  if (!isComponentMounted) {
    getAllNotifications();
    setIsComponentMounted(true);
  }
}, [isComponentMounted]);

  const handleEmailNotificationToggle = async () => {
    try {
    setEmailNotifications(!emailNotifications)
    console.log('Before API call - emailNotifications:', emailNotifications);
    const response = await profileApi.emailNotification(token);
    console.log('After API call - emailNotifications:', response.email_Notification);

    } catch (error) {
          setEmailNotifications(!emailNotifications);
    console.log(error);
  }
};


  const handlePushNotificationToggle = async () => {
    try {
       setPushNotifications(!pushNotifications);
      const response = await profileApi.pushNotification(token);
     
      // updateEnableNotifications();
    } catch (error) {
      setPushNotifications(!pushNotifications)
      console.log(error);
    }
  };

  const handleSmsNotificationToggle = async () => {
    try {
        setSMSNotifications(!smsNotifications);
      const response = await profileApi.smsNotification(token);
    
      // updateEnableNotifications();
    } catch (error) {
      setSMSNotifications(!smsNotifications)
      console.log(error);
    }
  };



  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    try {
      const response = await profileApi.AllNotifications(token);
      setEmailNotifications(response.email_Notification);
      setSMSNotifications(response.Sms_Notification);
      setPushNotifications(response.push_Notification);
      
      console.log(response,"here");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.card}>
      {/* <Text style={styles.sectionTitle}>Settings</Text> */}
      {/* <View style={styles.preference}>
        <Text style={styles.preferenceText}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: colors.secondary }}
          thumbColor={enableNotifications ? '#fff' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleNotificationToggle}
          value={enableNotifications}
        />
      </View> */}
      <View style={styles.notificationPreferences}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Email Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.secondary }}
            thumbColor={emailNotifications ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleEmailNotificationToggle}
            value={emailNotifications}
          />
        </View>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>SMS Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.secondary }}
            thumbColor={smsNotifications ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSmsNotificationToggle}
            value={smsNotifications}
          />
        </View>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Push Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.secondary }}
            thumbColor={pushNotifications ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handlePushNotificationToggle}
            value={pushNotifications}
          />
        </View>
        <View>
          <TouchableOpacity >
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Quick Links</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 16,
  },
  notificationPreferences: {
    marginTop: 20,
  },
});
