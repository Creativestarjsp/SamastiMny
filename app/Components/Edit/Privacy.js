import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';

const Privacy = ({ details }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hideContactDetails, setHideContactDetails] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

    useEffect(() => {
    const { contactprivacy, imageprivacy} = details;

    setHideContactDetails(contactprivacy);
    setHideImages(imageprivacy);
    
    }, [details]);
  
  const ContactPrivacy = () => {
  
    try {
      setHideContactDetails(!hideContactDetails)

      const response = profileApi.updatecontactPrivacy(token,!hideContactDetails)
      if (response) {
        console.log(response)
      }
    } catch (error) {
      setHideContactDetails(!hideContactDetails)
    }
  };

  const ImagePrivacy = () => {
  
    try {
      setHideImages(!hideImages)

      const response = profileApi.updateImagePrivacy(token,!hideImages)
      if (response) {
        console.log(response)
      }
    } catch (error) {
      setHideImages(!hideImages)
    }
  };
  return (
    <View style={styles.container}>
      <Text>Privacy </Text>
      {isEditMode ? (
        <TouchableOpacity style={styles.editButton} onPress={saveDetails}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Hide Contact Details</Text>
        <Switch
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={hideContactDetails ? '#f4f3f4' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ContactPrivacy}
          value={hideContactDetails}
        
        />
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Hide or Visible Images</Text>
        <Switch
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={hideImages ? '#f4f3f4' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ImagePrivacy}
          value={hideImages}
      
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
  },
});

export default Privacy;
