import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../Assets/Colors/Colors';
import { useSelector } from 'react-redux';

const Verification = () => {
      const user = useSelector((state) => state.auth?.user);
console.log(user,"qwe")
  return (
    <View style={styles.container}>
      <View style={styles.verificationCard}>
        <Text style={styles.title}>Verification Status</Text>
        <View style={styles.verificationItem}>
                  <Text>Email:</Text>
                  {user?.userdata?.emailVerification?( <Text style={styles.status}>Verified</Text>):( <Text style={styles.status}>Not Verified</Text>)}
         
        </View>
        <View style={styles.verificationItem}>
                  <Text>Mobile:</Text>
                  {user?.userdata?.phoneVerification?( <Text style={styles.status}>Verified</Text>):( <Text style={styles.status}>Not Verified</Text>)}
      
        </View>
        <View style={styles.verificationItem}>
                  <Text>Profile:</Text>
                   {user?.userdata?.profileVerify?( <Text style={styles.status}>Verified</Text>):( <Text style={styles.status}>Not Verified</Text>)}
       
        </View>
      </View>
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
    marginBottom: 16,
    color: colors.primary, // Change to your primary color
  },
  verificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  status: {
    fontWeight: 'bold',
    color: colors.secondary, // Change to your secondary color
  },
});

export default Verification;
