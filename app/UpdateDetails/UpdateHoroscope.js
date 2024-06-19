import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../Assets/Colors/Colors';

export default function UpdateHoroScope({detailss,onPress, nav }) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleButtonPress = () => {
    // Handle button press logic here
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Dummy data for testing
  const details = {
    LocationOfBirth:detailss?.placeOfbirth,
    timeOfBirth:detailss?.placeOfbirth,
    Rashi:detailss?.rashi,
    Nakshatra:detailss?.nakshatra,
    gothra:detailss?.gothra
  };

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top, opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.card} onPress={onPress}>
        <View style={styles.basicdetailsContainer}>
          <View style={styles.Headerwithicon}>
            <Text style={styles.title}>HoroScope Details </Text>
            <View style={styles.Edit}>
              <TouchableOpacity onPress={handleButtonPress}>
                <View style={{ flexDirection: 'row' }}>
                  {nav === 'update' ? (
                    <Text style={{ color: colors.primary, marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>
                      Edit
                    </Text>
                  ) : (
                    <View />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <MaterialIcons name="my-location" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Location Of Birth</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.name}>{details.LocationOfBirth}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <Entypo name="back-in-time" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Time Of Birth</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.name}>{details.timeOfBirth}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <MaterialCommunityIcons name="zodiac-aquarius" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Rashi</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.name}>{details.Rashi}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <FontAwesome5 name="star-of-david" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Nakshatra</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.name}>{details.Nakshatra}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <MaterialCommunityIcons name="hands-pray" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Gothram</Text>

              <View style={styles.rowContainer}>
                <Text style={styles.name}>{details.gothra}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
    marginTop: -20,
    padding: 16,
  },
  icons: {
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    color: colors.secondary,
  },
  Headerwithicon: {
    flexDirection: 'row',
    marginBottom: 1,
    justifyContent: 'space-between',
  },
  Details: {
    marginBottom: 20,
    marginLeft: 40,
    fontSize: 24,
  },
  birthDate: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#777',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDetailsButton: {
    padding: 5,
    marginTop: 10,
  },
  addDetailsButtonText: {
    textAlign: 'center',
    color: colors.primary,
  },
});
