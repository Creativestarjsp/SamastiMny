import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function PageHeader({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Update</Text>
      </View>
      {/* Empty view to align title to center */}
      <View style={styles.emptyView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between', // Align items along the row
  },
  backButton: {
    paddingRight: 10,
  },
  titleContainer: {
    flex: 1, // Take up the available space
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyView: {
    width: 24, // Adjust width as needed to align the title in the center
  },
});
