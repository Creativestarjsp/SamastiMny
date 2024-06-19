import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../Assets/Colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function InterestedProfilesCard({name,count, onPress }) {

  const navigation =useNavigation()
  return (
    <View style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        
          <Text style={styles.title}>{name}</Text>
      
        <FontAwesome name="heart" size={24} color={colors.primary} />
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.subTitle}>Profiles saved for future connections</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={ ()=>navigation.navigate('Profiles')}>
        <Text style={styles.buttonText}>View Saved Profiles</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gradientBackground: {
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:colors.secondary,
    textAlign: 'center',
    // textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  countContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  count: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
