import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function MatchImage() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placekitten.com/200/300' }} // Replace with your image URL
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5', // Optional background color
  },
  image: {
    width: 200, // Adjust width as needed
    height: 300, // Adjust height as needed
    borderRadius: 10, // Optional border radius for rounded corners
  },
});
