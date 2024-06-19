import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,ActivityIndicator } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import profileApi from '../Services/Api/profileApi';
import { useSelector } from 'react-redux';
import generaldata from '../Assets/GeneralData/generaldata';
import colors from '../Assets/Colors/Colors';

const PartnerPreferences = () => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [lower,setLower]=useState('')
  const [upper,setUpper]=useState('')
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [selectedMotherTongue, setSelectedMotherTongue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  
  const [minIncome, setMinIncome] = useState('');
  const [maxIncome, setMaxIncome] = useState('');
  const [loading,setLoading]=useState(true)
  const token = useSelector((state) => state.auth?._j?.token);

  const filterDataByType = (type) => {
    return generaldata.filter(item => item.type === type);
  };

  
  useEffect(() => {
    
    handleSavePreferences()
  
  }, []); // Added profileId to the dependency array


  const handleSavePreferences = async () => {
    try {
      // Call your API to fetch partner preferences
      const response = await profileApi.getpartnerpref(token);
  
      // Check if the API call is successful
      if (response) {
        // Assuming response contains the partner preferences data
        const {
          minAge,
          maxAge,
          incomeRange,
          religion,
          country,
          occupation,
          mothertongue,
          community,
          education,
          state,
          city
          // Add other properties as needed
        } = response;
  console.log(response,"response")
        // Set states based on fetched partner preferences
        if (minAge) setMinAge(minAge.toString());
        if (maxAge) setMaxAge(maxAge.toString());
  
        if (incomeRange?.lower) setMinIncome(incomeRange.lower.toString());
        if (incomeRange?.upper) setMaxIncome(incomeRange.upper.toString());
  
        if (religion) setSelectedReligion({ key: religion._id, label: religion.name });
        if (city) setSelectedCity({ key: city._id, label: city.name });
        if (country) setSelectedCountry({ key: country._id, label: country.name });
  
        if (occupation) setSelectedOccupation({ key: occupation._id, label: occupation.name });
        if (mothertongue) setSelectedMotherTongue({ key: mothertongue._id, label: mothertongue.name });
        if (community) setSelectedCommunity({ key: community._id, label: community.name });
        if (education) setSelectedEducation({ key: education._id, label: education.name });
  
        if (state) setSelectedState({ key: state._id, label: state.name });
  
        setLoading(false);
        // Display success message or perform other actions
        console.log('Partner preferences fetched successfully');
      } else {
        // Handle case when the API call is not successful
        console.error('Error fetching partner preferences');
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.log('Error fetching partner preferences:', error.message);
      setLoading(false);
      // You can display an error message or perform other error handling as needed
    }
  };
  

  const savePreferences = async () => {
    try {
   
      const data = {
        education: selectedEducation.key,
        occupation: selectedOccupation.key,
        incomeRange: {
          lower: minIncome,
          upper: maxIncome
        },
        religion: selectedReligion.key,
        community: selectedCommunity.key,
        mothertongue: selectedMotherTongue.key,
        country: selectedCountry.key,
        state: selectedState.key,
        city: selectedCity.key
      };
  
      // Validate if any value is empty
      const emptyFields = Object.keys(data).filter(key => {
        const value = data[key];
        return value === undefined || value === '' || (typeof value === 'object' && Object.values(value).some(v => v === ''));
      });
  
      if (emptyFields.length > 0) {
        // If any value is empty, display an alert and stop further execution
       
        alert("Please fill in all fields");
        return;
      }
  
      console.log(data, "llll");
      setLoading(true)
      const response = await profileApi.updatePreferences(token, data);
  
      if (response) {
        alert("Updated");
        setLoading(false)
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  
  
if(loading){
  return(
    <View style={{flex:1,justifyContent:"center",alignContent:"center"}}>
        <ActivityIndicator size="small" color="#0000ff" />
    </View>
  )
}
  


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Partner Preferences</Text>

      {/* Add similar blocks for other preferences */}

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Age Range</Text>
        <View style={styles.ageRangeContainer}>
          <TextInput
            style={styles.input}
            placeholder="Min Age"
            keyboardType="numeric"
            value={minAge}
            onChangeText={text => setMinAge(text)}
          />
          <Text style={{ marginHorizontal: 10 }}>to</Text>
          <TextInput
            style={styles.input}
            placeholder="Max Age"
            keyboardType="numeric"
            value={maxAge}
            onChangeText={text => setMaxAge(text)}
          />
        </View>
      </View>


      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Income Range</Text>
        <View style={styles.ageRangeContainer}>
          <TextInput
            style={styles.input}
            placeholder="Min Income"
            keyboardType="numeric"
            value={minIncome}
            onChangeText={text => setMinIncome(text)}
          />
          <Text style={{ marginHorizontal: 10 }}>to</Text>
          <TextInput
            style={styles.input}
            placeholder="Max Income"
            keyboardType="numeric"
            value={maxIncome}
            onChangeText={text => setMaxIncome(text)}
          />
        </View>
      </View>
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Religion</Text>
        <ModalSelector
          data={filterDataByType('Religion').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Religion"
          onChange={option =>setSelectedReligion(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Religion"
            editable={false}
            value={selectedReligion?.label}
          />
        </ModalSelector>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Community</Text>
        <ModalSelector
          data={filterDataByType('Community').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Community"
          onChange={option => setSelectedCommunity(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Community"
            editable={false}
            value={selectedCommunity?.label}
          />
        </ModalSelector>
      </View>
      
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Mother Tounge</Text>
        <ModalSelector
          data={filterDataByType('Mothertounge').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Mothertounge"
          onChange={option => setSelectedMotherTongue(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Mothertounge"
            editable={false}
            value={selectedMotherTongue?.label}
          />
        </ModalSelector>
      </View>


      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Occupation</Text>
        <ModalSelector
           data={filterDataByType('Occupation').map(item => ({ key: item._id.$oid, label: item.name }))}
          
          initValue="Select Occupation"
          onChange={option => setSelectedOccupation(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Occupation"
            editable={false}
            value={selectedOccupation?.label}
          />
        </ModalSelector>
      </View>

     
      

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Education</Text>
        <ModalSelector
            data={filterDataByType('Qualification').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Qualification"
          onChange={option => setSelectedEducation(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Qualification"
            editable={false}
            value={selectedEducation?.label}
          />
        </ModalSelector>
      </View>


      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Country</Text>
        <ModalSelector
            data={filterDataByType('Country').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Country"
          onChange={option => setSelectedCountry(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Country"
            editable={false}
            value={selectedCountry?.label}
          />
        </ModalSelector>
      </View>


      
    


      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>State</Text>
        <ModalSelector
           data={filterDataByType('State').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select State"
          onChange={option => setSelectedState(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select State"
            editable={false}
            value={selectedState?.label}
          />
        </ModalSelector>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>City</Text>
        <ModalSelector
             data={filterDataByType('City').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select City"
          onChange={option => setSelectedCity(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select City"
            editable={false}
            value={selectedCity?.label}
          />
        </ModalSelector>
      </View>

      {/* Repeat similar blocks for other preferences */}
<View style={{marginBottom:200}}>
<TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
</View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  preferenceItem: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor:colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerPreferences;
