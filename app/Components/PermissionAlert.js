import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PermissionAlert = ({ onRequestPermission, onCancel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>We need your permission to enable certain features.</Text>
      <TouchableOpacity style={styles.button} onPress={onRequestPermission}>
        <Text style={styles.buttonText}>Grant Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PermissionAlert;
