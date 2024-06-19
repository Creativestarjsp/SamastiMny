import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function MatcheCard({ user }) {
  const { name, age, gender, image } = user;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text>{`Age: ${age}`}</Text>
        <Text>{`Gender: ${gender}`}</Text>
      </View>
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreButtonText}>View More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  viewMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
