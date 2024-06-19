import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import colors from '../../Assets/Colors/Colors';
import generaldata from '../../Assets/GeneralData/generaldata';
import { useSelector } from 'react-redux';
import profileApi from '../../Services/Api/profileApi';
import { Country, State, City } from 'country-state-city'; 

const EditBasic = ({ details }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);
  const [selectedMotherTongue, setSelectedMotherTongue] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedResidency, setReseidency] = useState(null);
  const [grownupcountry, setgrownup] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDietPreference, setSelectedDietPreference] = useState('');
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [height, setHeight] = useState('');
  const token = useSelector((state) => state.auth?.token);
  const [loading,setLoading]=useState(false)
console.log(selectedCountry,selectedState,selectedCity,"prrrrrrr");
  // Filtered states based on the selected Country
  
const filteredStates = () => {
  if (selectedCountry?.isoCode) {
    const states = State.getStatesOfCountry(selectedCountry?.isoCode);
    return states || [];
  }
  return [];
};

 const filteredCities = () => {
  if (selectedCountry?.isoCode) {
    const cities = City.getCitiesOfState(selectedCountry?.isoCode,selectedState?.isoCode);
    return cities || [];
  }
  return [];
};

  



  const Countries = Country.getAllCountries();

  const countriesArray = Object.entries(Country.getAllCountries()).map(([isoCode, country]) => ({
  key: country.isoCode, // Access the ISO code property of the country object
  label: country.name,
}));

 
const stateArray = Object.entries(State.getStatesOfCountry(selectedCountry?.key)).map(([isoCode, state]) => ({
  key: state.isoCode,
  label: state.name,
}));

// Assuming you have already imported the necessary functions or classes, such as City.getCitiesOfState

const cityArray = selectedCountry && selectedState
  ? Object.entries(City.getCitiesOfState(selectedCountry?.key,selectedState?.key))
      .map(([isoCode, city]) => ({
        key: city.name,
        label: city.name,
      }))
  : [];

 
  
  useEffect(() => {
    // Set initial values when component mounts
    const {
      religion,
      gender,
      maritalStatus,
      country,
      mothertongue,
      community,
      state,
      diet,
      blood_group,
      dateOfBirth,
      city,
      residencystatus,
      grewupcountry,
      height,
    } = details;
console.log(  religion,
      
      country,
      mothertongue,
      community
     ,"bbbfbfbfb")
    if (gender) setSelectedGender({ key: details.gender, label: details.gender });
    if (maritalStatus) setSelectedMaritalStatus({ key: details.maritalStatus, label: details.maritalStatus });
    if (residencystatus) setReseidency({ key: residencystatus, label: residencystatus });
    if (religion) setSelectedReligion({ key: religion._id, label: religion.name });
    let countrytiso = ""
     let countrytname = "" 
     let statetiso = ""
     let statetname="" 
   if (country) {
  const allCountries = Country.getAllCountries();
  // Find the country object by its name
  const countryObject = Object.values(allCountries).find(c => c.name === country);

    
  if (countryObject) {
    // If the country object is found, set the selected country
    setSelectedCountry({ key: countryObject.isoCode, label: country });
    countrytiso = countryObject.isoCode
    countrytname= country
  }
}

    // Assuming state and city are the names you have
if (state) {
  const allStates = State.getAllStates(selectedCountry?.isoCode);
  // Find the state object by its name
  const stateObject = Object.values(allStates).find(s => s.name === state);

  if (stateObject) {
    // If the state object is found, set the selected state
    setSelectedState({ key: stateObject.isoCode, label: state });
      statetiso = stateObject.isoCode
      statetname=state
  }
}

if (city) {
  const allCities = City.getCitiesOfState(countrytiso,statetiso);
  // Find the city object by its name
  const cityObject = Object.values(allCities).find(c => c.name === city);

  if (cityObject) {
    // If the city object is found, set the selected city
    setSelectedCity({ key: cityObject.name, label: city });
  }
}

 
   
    if (grewupcountry) {
  const allGrewUpCountries = Country.getAllCountries();
  // Find the country object by its name
  const grewUpCountryObject = Object.values(allGrewUpCountries).find(c => c.name === grewupcountry);

  if (grewUpCountryObject) {
    // If the country object is found, set the grewupcountry state
    setgrownup({ key: grewUpCountryObject.isoCode, label: grewupcountry });
  }
}
 if (dateOfBirth) setSelectedDateOfBirth(dateOfBirth);
    if (blood_group) setSelectedBloodGroup({ key: blood_group._id, label: blood_group.name });
    if (mothertongue) setSelectedMotherTongue({ key: mothertongue._id, label: mothertongue.name });
    if (community) setSelectedCommunity({ key: community._id, label: community.name });
  
    if (diet) setSelectedDietPreference({ key: diet, label: diet });
    if (height) setHeight(height.toString());
  }, [details]);

  const toggleEditMode = () => {
    // Toggle the edit mode
    setIsEditMode(!isEditMode);
  };

  const saveDetails = async () => {
    try {
      // Check if any of the selected values is empty
     if (!selectedMaritalStatus) {
  alert('Please select Marital Status');
  return;
}

if (!selectedReligion) {
  alert('Please select Religion');
  return;
}

if (!selectedMotherTongue) {
  alert('Please select Mother Tongue');
  return;
}

if (!selectedCommunity) {
  alert('Please select Community');
  return;
}

if (!selectedBloodGroup) {
  alert('Please select Blood Group');
  return;
}

if (!selectedCountry) {
  alert('Please select Country');
  return;
}

if (!selectedState) {
  alert('Please select State');
  return;
}

if (!selectedCity) {
  alert('Please select City');
  return;
}

if (!selectedDietPreference) {
  alert('Please select Diet Preference');
  return;
}

if (!grownupcountry) {
  alert('Please select Grown Up Country');
  return;
}

if (!selectedResidency) {
  alert('Please select Residency');
  return;
}

if (!height) {
  alert('Please enter Height');
  return;
}

// Add more conditions if needed

setLoading(true)
      const data = {
        maritalStatus: selectedMaritalStatus.key,
        religion: selectedReligion.key,
        mothertongue: selectedMotherTongue.key,
        community: selectedCommunity.key,
        blood_group: selectedBloodGroup.key,
        country: selectedCountry.label,
        state: selectedState.label,
        city: selectedCity.label,
        grewupcountry: grownupcountry.label,
        residencystatus: selectedResidency.key,
        diet: selectedDietPreference.key,
        height: height.toString(),
      };

      const response = await profileApi.updatebasicdetails(token, data);

      if (response) {
        setLoading(false)
        alert('Updated');
        // If the update is successful, exit edit mode
        setIsEditMode(false);
      }
    } catch (error) {
      console.log(error);
         setLoading(false)
    }
  };

  const filterDataByType = (type) => {
  return generaldata.filter(item => item.type === type);
  };
  
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

    const setSelectedHeight = (text) => {
    // You can perform any validation or formatting here
    setHeight(text);
  };

   const Residencystatus = [
  { key: "Citizen", label: 'Citizen' },
  { key: "Permanent Resident", label: 'Permanent Resident' },
  { key: 'Student Visa', label: 'Student Visa' },
  { key: 'Work Permit', label: 'Work Permit' },
];

  
const Diet = [
  { key: 'Veg', label: 'Veg' },
  { key: 'Non-Veg', label: 'Non-Veg' },
  { key: 'Eggetarian', label: 'Eggetarian' },
  { key: 'Occasionally Non-Veg', label: 'Occasionally Non-Veg' },
  { key: 'Jain', label: 'Jain' },
  { key: 'Vegan', label: 'Vegan' },
];

  
  const genderData = [{ key: 'male', label: 'Male' }, { key: 'female', label: 'Female' }];
  const maritalStatusData = [
    { key: 'Single', label: 'Single' },
    { key: 'Married', label: 'Married' },
    { key: 'Divorced', label: 'Divorced' },
    { key: 'Divorcing', label: 'Divorcing' },
    // Add other options
  ];
  // Add similar data arrays for other fields
  if (loading) {
    return (
      <View style={styles.container}>
         <ActivityIndicator size="small" color="#0000ff" />
    </View>
  )
}

  return (
    <View style={styles.container}>
      <Text>Basic Details</Text>

      <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
        <Text style={styles.editButtonText}>{isEditMode ? 'Cancel' : 'Edit'}</Text>
      </TouchableOpacity>

      {/* Gender */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Gender</Text>

        {isEditMode ?
         <ModalSelector
          data={[
            { key: 'male', label: 'Male' },
            { key: 'female', label: 'Female' },
          ]}
          initValue="Select Gender"
          onChange={(option) => setSelectedGender(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Gender"
            editable={isEditMode}
            value={selectedGender?.label}
          />
          </ModalSelector>
          :
         <TextInput
            style={styles.input}
            placeholder="Select Gender"
            editable={isEditMode}
            value={selectedGender?.label}
          />}
       
      </View>

      {/* Marital Status */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Marital Status</Text>

        {isEditMode?<ModalSelector
          data={[
            { key: 'Single', label: 'Single' },
            { key: 'Married', label: 'Married' },
            { key: 'Divorced', label: 'Divorced' },
            { key: 'Divorcing', label: 'Divorcing' },
          ]}
          initValue="Select Marital Status"
          onChange={(option) => setSelectedMaritalStatus(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Marital Status"
            editable={isEditMode}
            value={selectedMaritalStatus?.label}
          />
        </ModalSelector>: <TextInput
            style={styles.input}
            placeholder="Select Marital Status"
            editable={isEditMode}
            value={selectedMaritalStatus?.label}
          />}
        
      </View>

      {/* Height */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Height in cms"
          onChangeText={setHeight}
          value={height}
          keyboardType="numeric"
          editable={isEditMode}
        />
      </View>

          {/* Mother Tongue */}
<View style={styles.preferenceItem}>
  <Text style={styles.preferenceTitle}>Community</Text>
 {isEditMode? <ModalSelector
     data={filterDataByType('Community').map(item => ({ key: item._id.$oid, label: item.name }))}
    initValue="Select Community "
    onChange={option => setSelectedCommunity(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select Community"
      editable={isEditMode}
      value={selectedCommunity?.label}
    />
        </ModalSelector> :
         <TextInput
      style={styles.input}
      placeholder="Select Community"
      editable={isEditMode}
      value={selectedCommunity?.label}
    />}
        
      </View>

      {/* Mother Tongue */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Mother Tongue</Text>
           {isEditMode? <ModalSelector
          data={generaldata
            .filter((item) => item.type === 'Mothertounge')
            .map((item) => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Mother Tongue"
          onChange={(option) => setSelectedMotherTongue(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Mother Tongue"
            editable={isEditMode}
            value={selectedMotherTongue?.label}
          />
        </ModalSelector> :
        <TextInput
            style={styles.input}
            placeholder="Select Mother Tongue"
            editable={isEditMode}
            value={selectedMotherTongue?.label}
          />}
       
      </View>
   
<View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Religion</Text>
        {isEditMode? <ModalSelector
       data={filterDataByType('Religion').map(item => ({ key: item._id.$oid, label: item.name }))}
    initValue="Select Religion"
    onChange={option => setSelectedReligion(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select Religion"
      editable={isEditMode}
      value={selectedReligion?.label}
    />
        </ModalSelector> :
    <TextInput
      style={styles.input}
      placeholder="Select Religion"
      editable={isEditMode}
      value={selectedReligion?.label}
    />}
 
      </View>
      
      {/* Country */}
<View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Country</Text>
        {isEditMode?<ModalSelector
       data={countriesArray}
    initValue="Select Country"
    onChange={option => setSelectedCountry(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select Country"
      editable={isEditMode}
      value={selectedCountry?.label}
    />
        </ModalSelector> :
           <TextInput
      style={styles.input}
      placeholder="Select Country"
      editable={isEditMode}
      value={selectedCountry?.label}
    />
  }
  
      </View>
      

      {/* State */}
<View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>State</Text>
        {isEditMode?<ModalSelector
       data={stateArray}
    initValue="Select State"
    onChange={option => setSelectedState(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select State"
      editable={isEditMode}
      value={selectedState?.label}
    />
        </ModalSelector> :
  <TextInput
      style={styles.input}
      placeholder="Select State"
      editable={isEditMode}
      value={selectedState?.label}
    />}
  
      </View>
      

{/* City */}
<View style={styles.preferenceItem}>
  <Text style={styles.preferenceTitle}>City</Text>
  {isEditMode ? (
    <ModalSelector
            data={cityArray}
            initValue="Select City"
            onChange={(option) => {
           console.log('Selected City:', option);
        
              setSelectedCity(option)
            }
            }
    >
      <TextInput
        style={styles.input}
        placeholder="Select City"
        editable={isEditMode}
        value={selectedCity?.label}
      />
    </ModalSelector>
  ) : (
    <TextInput
      style={styles.input}
      placeholder="Select City"
      editable={isEditMode}
      value={selectedCity?.label}
    />
  )}
</View>
      
      {/* Residency Status */}
     <View style={styles.preferenceItem}>
       
        <Text style={styles.preferenceTitle}>Residency Status</Text>
        {isEditMode?<ModalSelector
          data={Residencystatus}
          initValue="Select Residency Status"
          onChange={option => setReseidency(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Residency Status"
            editable={isEditMode}
            value={selectedResidency?.label}
          />
        </ModalSelector>:<TextInput
            style={styles.input}
            placeholder="Select Residency Status"
            editable={isEditMode}
            value={selectedResidency?.label}
          />}
        
      </View>
      
            {/* Grow up */}
<View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Grow up</Text>
        {isEditMode?<ModalSelector
       data={countriesArray}
    initValue="Select Religion"
    onChange={option => setgrownup(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select Country"
      editable={isEditMode}
      value={grownupcountry?.label}
    />
  </ModalSelector>: <TextInput
      style={styles.input}
      placeholder="Select Country"
      editable={isEditMode}
      value={grownupcountry?.label}
    />}
  
</View>

{/* Add similar blocks for other fields */}




{/* Date of Birth */}
<View style={styles.preferenceItem}>
  <Text style={styles.preferenceTitle}>Date of Birth</Text>
 
        <View>
          <Text style={{}}>{selectedDateOfBirth?formatDate(selectedDateOfBirth):"" }</Text>
        </View>
</View>

      {/* Blood Group */}
<View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Blood Group</Text>
        {isEditMode?<ModalSelector
    data={filterDataByType('Bloodgroup').map(item => ({ key: item._id.$oid, label: item.name }))}
    initValue="Select Blood Group"
    onChange={option => setSelectedBloodGroup(option)}
  >
    <TextInput
      style={styles.input}
      placeholder="Select Blood Group"
      editable={isEditMode}
      value={selectedBloodGroup?.label}
    />
  </ModalSelector>:<TextInput
      style={styles.input}
      placeholder="Select Blood Group"
      editable={isEditMode}
      value={selectedBloodGroup?.label}
    />}
  
      </View>
      
 {/* Diet Preference */}
  <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Diet </Text>
        {isEditMode?<ModalSelector
          data={Diet}
          initValue="Select Diet Preference"
          onChange={option => setSelectedDietPreference(option)}
        >
          <TextInput
          style={styles.input}
            placeholder="Select Diet Preference"
            editable={isEditMode}
            value={selectedDietPreference?.label}
          />
        </ModalSelector>: <TextInput
          style={styles.input}
            placeholder="Select Diet Preference"
            editable={isEditMode}
            value={selectedDietPreference?.label}
          />}
        
      </View>


      {/* Add similar blocks for other fields */}
      {/* Save Button */}
      {isEditMode && (
        <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 50,
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
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default EditBasic;
