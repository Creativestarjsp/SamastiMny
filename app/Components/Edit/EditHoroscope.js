import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import generaldata from '../../Assets/GeneralData/generaldata';
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';

const EditHoroscope = ({ details }) => {
  const [nakshatra, setNakshatra] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [rashi, setRashi] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [gothra, setGothram] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const savedetails = async () => {
    try {
      const data = {
        nakshatra,
       placeOfbirth:placeOfBirth,
        rashi,
        timeOfBirth,
        gothra
      };
      const response = await profileApi.updateHoroscope(token, data);
      if (response) {
        alert('Updated');
        toggleEditMode();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { nakshatra, placeOfbirth, rashi, timeOfBirth,gothra } = details;

    setNakshatra(nakshatra);
    setPlaceOfBirth(placeOfbirth);
    setRashi(rashi);
    setTimeOfBirth(timeOfBirth);
    setGothram(gothra)
  }, [details]);

  return (
    <View style={styles.container}>
      <Text>Horoscope Details</Text>
      {isEditMode ? (
        <TouchableOpacity style={styles.editButton} onPress={savedetails}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}

      {/* Nakshatra */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Nakshatra</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Nakshatra"
          editable={isEditMode}
          value={nakshatra}
          onChangeText={(text) => setNakshatra(text)}
        />
      </View>

      {/* Place of Birth */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Place of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Place of Birth"
          editable={isEditMode}
          value={placeOfBirth}
          onChangeText={(text) => setPlaceOfBirth(text)}
        />
      </View>

      {/* Rashi */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Rashi</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Rashi"
          editable={isEditMode}
          value={rashi}
          onChangeText={(text) => setRashi(text)}
        />
      </View>

      {/* Time of Birth */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Time of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Time of Birth"
          editable={isEditMode}
          value={timeOfBirth}
          onChangeText={(text) => setTimeOfBirth(text)}
        />
      </View>

      {/* Rashi */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Gothram</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Gothram"
          editable={isEditMode}
          value={gothra}
          onChangeText={(text) => setGothram(text)}
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
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
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

export default EditHoroscope;
