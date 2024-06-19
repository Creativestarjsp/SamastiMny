import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon from the library
import colors from '../Assets/Colors/Colors';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authActions';
import { useNavigation } from '@react-navigation/native';
export default function Header() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNotificationsPress = () => {
    // Logic to handle notification button press

    dispatch(logout())
    

    console.log('Notifications button pressed');
  };



  return (
    <View style={styles.header}>
      {/* Left side: Home Title */}
      <Text style={styles.title}>Home</Text>
      {/* Notifications */}

      <View style={{flexDirection:"row"}}>
         <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <View style={styles.notificationContainer}>
          <Icon name="notifications" size={24} color={colors.primary} />
         
        </View>
      </TouchableOpacity>
      {/* Right side: Notifications with Icon */}
      <TouchableOpacity onPress={handleNotificationsPress}>
        <View style={styles.notificationContainer}>
          <Icon name="power" size={24} color={colors.primary} />
         
        </View>
      </TouchableOpacity>
   </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.secondary
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: '#007AFF', // Adjust the color as needed
    marginLeft: 8,
  },
});
