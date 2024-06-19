// ProfileCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilesCard = ({ title, data }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {data.map((item, index) => (
      <Text key={index} style={styles.cardText}>
        {item.name || item}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ProfilesCard;
