import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import colors from '../Assets/Colors/Colors';
import RNPreventScreenshot, { addListener } from 'react-native-screenshot-prevent';
export default function ProfileCard({ profile }) {
  const navigation = useNavigation();

  if (!profile) {
    return null; // Handle the case where profile data is missing
  }

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
  
  
  console.log(profile.imageprivacy,"jsjjs")
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <LinearGradient
      colors={['#fff', '#fff']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.unsaveButton}>
        {/* Add your unsave button icon here */}
      </TouchableOpacity>

      <View style={styles.profileContainer}>
      <View style={styles.profileContainer}>
  {!profile.imageprivacy ? (
    profile.profile_pic ? (
      <Image
        source={{ uri: profile?.profile_pic }}
        style={styles.profileImage}
        accessibilityLabel="User Profile Image"
      />
    ) : (
      <View style={styles.profileImagePlaceholder}>
        <Ionicons name="person-outline" size={60} color="#ccc" />
      </View>
    )
  ) : null}
</View>

        

        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profile.fullName || 'Unknown'}</Text>
          <Text style={styles.profileDescription}>
            Age: {profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : 'Unknown'} |{' '}
            {profile.gender || 'Unknown'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewProfileButton}
        onPress={() => navigation.navigate('ViewProfiles', { profileId: profile.user })}
      >
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    margin: 16,
    padding: 16,
    position: 'relative',
  },
  unsaveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  profileDescription: {
    fontSize: 16,
    color: '#666',
  },
  viewProfileButton: {
    backgroundColor:colors.primary,
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewProfileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
