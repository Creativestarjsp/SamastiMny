import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PermissionAlertCard = ({ onCancelPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.alertText}>
      To enhance your experience, we kindly request your permission to receive important notifications. Additionally, we require access to your device storage. Please enable notification access and grant storage permission in your device settings.
      </Text>
      <TouchableOpacity style={styles.openSettingsButton} onPress={onCancelPress}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  alertText: {
    fontSize: 16,
    marginBottom: 16,
  },
  openSettingsButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionAlertCard;
