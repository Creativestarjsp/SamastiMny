import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../Assets/Colors/Colors';

const Customercare = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>Customer Care</Text>
        <Text style={styles.description}>
          Our support team is available 24/7 to assist you. Feel free to contact us for any
          assistance or inquiries.
        </Text>
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Contact us:</Text>
          <Text style={styles.contactInfo}>support@samastimatrimony.com</Text>
        </View>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => console.log('Terms & Conditions pressed')}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Privacy Policy pressed')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => console.log('Customer Support Button pressed')}
        >
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  contactInfo: {
    fontSize: 14,
    color: '#3498db',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  supportButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Customercare;
