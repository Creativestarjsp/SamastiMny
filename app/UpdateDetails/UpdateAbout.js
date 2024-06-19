import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../Assets/Colors/Colors';

export default function UpdateAbout({ details, onPress, nav }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const maxLength = 100; // Maximum characters to display initially

  const [showAll, setShowAll] = useState(false);
  const [displayText, setDisplayText] = useState(details.about ? details.about.substring(0, maxLength) : "");

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

  const toggleText = () => {
    if (showAll) {
      setDisplayText(details.about.substring(0, maxLength));
    } else {
      setDisplayText(details.about);
    }
    setShowAll(!showAll);
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <View style={styles.card} onPress={onPress}>
            <View style={styles.titleIcon}>
              <Text style={styles.title}>About</Text>
              {nav === "update" ? (
                <TouchableOpacity onPress={handleButtonPress}>
                  <View style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                    {/* <Foundation name="pencil" size={24} color={colors.primary} /> */}
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>

            {details.about ? (
              <Text>{displayText}</Text>
            ) : null}

            {details?.about?.length > maxLength && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} title={showAll ? "Show Less" : "Read More"} onPress={toggleText}>
                  <View style={styles.buttonContent}>
                    <Text style={showAll ? styles.showLess : styles.readMore}>
                      {showAll ? "Show Less" : "Read More"}
                    </Text>
                    <MaterialIcons name={showAll ? "expand-less" : "expand-more"} size={24} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
    padding: 16,
  },
  titleIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.primary,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showLess: {
    color: '#fff',
    fontSize: 16,
  },
  readMore: {
    color: '#fff',
    fontSize: 16,
  },
});
