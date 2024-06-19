// ProfileHorizontalCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPreventScreenshot, { addListener } from 'react-native-screenshot-prevent';

const ProfileHorizontalCard = ({ profileId,name, age, gender, profile_pic, privacy }) => {
  const navigation = useNavigation();
  console.log(profileId, "kksksk")
   useEffect(() => {
    // Enable screenshot prevention when the component mounts
    RNPreventScreenshot.enabled(true);

    // Add a listener to handle screenshot events
    const subscription = addListener(() => {
      console.log('Screenshot taken');
      // You can add custom logic when a screenshot is detected
      showAlert({
      title: 'Warning',
      message: 'You have taken a screenshot of the app. This is prohibited due to security reasons.',
      confirmText: 'I understand'
    });
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      RNPreventScreenshot.enabled(false); // Disable screenshot prevention
      subscription.remove(); // Remove the listener
    };
   }, []);
  
  
  return (
    <View >
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('ViewProfiles', { profileId: profileId })}>

     
      {privacy?(<View></View>):<Image source={{ uri: profile_pic }} style={styles.profileImage} />}
      
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileDetails}>{age} years</Text>
        <Text style={styles.profileDetails}>{gender}</Text>
        </View>
         </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    marginWidth:1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor:"#eeee"
    
  },
  profileImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  profileInfo: {
    padding: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfileHorizontalCard;
