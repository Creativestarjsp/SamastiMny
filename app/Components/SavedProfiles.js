import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SavedProfiles() {
  return (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
          style={styles.profileImage}
        />
        
        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileDescription}>
            Age: 28 | Location: City, Country
          </Text>
        </View>
      </View>

      {/* View Profile Button */}
      <TouchableOpacity style={styles.viewProfileButton}>
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
      </TouchableOpacity>
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
        margin: 16,
        padding: 16,
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
  },
  profileDetails: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 16,
    color: '#666',
  },
  viewProfileButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
