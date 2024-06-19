import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../Assets/Colors/Colors';

// Sample data for profile details
const profileDetails = {
  name: 'Alice',
  age: 26,
  occupation: 'Engineer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam massa odio, et pulvinar leo gravida vitae.',
  interests: ['Reading', 'Travelling', 'Photography'],
  location: 'City, Country',
  education: 'Bachelor of Science in Engineering',
  // Add more profile details as needed
};

export default function ProfileDetails() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>{profileDetails.name}</Text>
        <Text style={styles.subText}>{`${profileDetails.age} years old`}</Text>
        <Text style={styles.subText}>{profileDetails.occupation}</Text>
        <Text style={styles.description}>{profileDetails.description}</Text>
        <Text style={styles.sectionTitle}>Interests:</Text>
        <View style={styles.interestsContainer}>
          {profileDetails.interests.map((interest, index) => (
            <Text key={index} style={styles.interestItem}>{interest}</Text>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Location:</Text>
        <Text style={styles.subText}>{profileDetails.location}</Text>
        <Text style={styles.sectionTitle}>Education:</Text>
        <Text style={styles.subText}>{profileDetails.education}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  interestItem: {
    backgroundColor: colors.primary,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
});
