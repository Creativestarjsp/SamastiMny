import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Country, State, City } from 'country-state-city'; // Import Country from the package
import generaldata from '../../Assets/GeneralData/generaldata';
import colors from '../../Assets/Colors/Colors';
import authApi from '../../Services/Api/authApi';

export default function Contact({ route }) {
  console.log(route.params);
  const {
    name,
    gender,
    maritalStatus,
    lookingFor,
    dateOfBirth,
  } = route.params;
  console.log(
    name,
    gender,
    maritalStatus,
    lookingFor,
    dateOfBirth
  );
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(email, 'eeeeeeemail');

  // Modal state for Country
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Modal state for State
  const [isStateModalVisible, setStateModalVisible] = useState(false);
  const [searchState, setSearchState] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // Modal state for City
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Modal state for Community
  const [isCommunityModalVisible, setCommunityModalVisible] = useState(false);
  const [searchCommunity, setSearchCommunity] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');

  // Modal state for Religion
  const [isReligionModalVisible, setReligionModalVisible] = useState(false);
  const [searchReligion, setSearchReligion] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');

  // Modal state for Mother Tongue
  const [isMotherTongueModalVisible, setMotherTongueModalVisible] = useState(
    false
  );
  const [searchMotherTongue, setSearchMotherTongue] = useState('');
  const [selectedMotherTongue, setSelectedMotherTongue] = useState('');

  const handleNext = async () => {
    try {
      // Validate and proceed to the next step
      if (!selectedCountry) {
        alert('Please select a Country');
        return;
      }

      if (!selectedState) {
        alert('Please select a State');
        return;
      }

      if (!selectedCity) {
        alert('Please select a City');
        return;
      }

      if (!selectedCommunity) {
        alert('Please select a Community');
        return;
      }

      if (!selectedMotherTongue) {
        alert('Please select a Mother Tongue');
        return;
      }

      if (!selectedReligion) {
        alert('Please select a Religion');
        return;
      }

      if (!isValidPhoneNumber(phoneNumber)) {
        alert('Invalid Phone Number', 'Please enter a 10-digit phone number.');
        return;
      }

      if (!email) {
        alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      setLoading(true);

      const formData = {
        Name: name,
        // Add other properties as needed
        religion: selectedReligion._id
          ? selectedReligion._id.$oid
          : '',
        mothertongue: selectedMotherTongue._id
          ? selectedMotherTongue._id.$oid
          : '',
        community: selectedCommunity._id
          ? selectedCommunity._id.$oid
          : '',
        country: selectedCountry.name
          ? selectedCountry.name
          : null,
        state: selectedState.name,
        city: selectedCity.name,
        phone: phoneNumber,
        dob: dateOfBirth,
        email: email,
        gender: gender,
        preferedgender: lookingFor,
        maritalStatus: maritalStatus,
        country_code: selectedCountry.phonecode,
      };

      console.log('Form data before API call:', formData);

      // Assuming authApi.register returns a promise
      const response = await authApi.register(formData);

      console.log('API response:', response.data);

      if (response) {
        alert('Successfully Registered');
        // Reset form and navigate on success
        setLoading(false);
        navigation.navigate('Login');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Something Went Wrong. Try again Later');
    }
  };

  const isValidPhoneNumber = (number) => {
    // Check if the phone number has exactly 10 digits
    return /^\d{10}$/.test(number);
  };

  // Data from generaldata
  const uniqueKeyFilter = (type) => {
    return Array.from(
      new Set(
        generaldata
          .filter((item) => item.type === type)
          .map((item) => item?._id?.$oid)
      )
    ).map((id) => generaldata.find((item) => item?._id?.$oid === id));
  };

  const countryData = uniqueKeyFilter('Country');
  console.log(selectedCountry?.isoCode,"gggggg")
 console.log(State.getStatesOfCountry("IN"))
 
  // Filtered states based on the selected Country
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
  const communityData = uniqueKeyFilter('Community');
  const religionData = uniqueKeyFilter('Religion');
  const motherTongueData = uniqueKeyFilter('Mothertounge');

  // Function to toggle the modal for each dropdown
  const toggleCountryModal = () =>
    setCountryModalVisible(!isCountryModalVisible);
  const toggleStateModal = () => setStateModalVisible(!isStateModalVisible);
  const toggleCityModal = () => setCityModalVisible(!isCityModalVisible);
  const toggleCommunityModal = () =>
    setCommunityModalVisible(!isCommunityModalVisible);
  const toggleReligionModal = () =>
    setReligionModalVisible(!isReligionModalVisible);
  const toggleMotherTongueModal = () =>
    setMotherTongueModalVisible(!isMotherTongueModalVisible);

  // Function to handle selection for each dropdown
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState("")
    setSelectedCity("")
    toggleCountryModal();
  };
  const handleStateSelect = (state) => {
    setSelectedState(state);
    toggleStateModal();
  };
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    console.log(city, 'ksdd');
    toggleCityModal();
  };
  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
    toggleCommunityModal();
  };
  const handleReligionSelect = (religion) => {
    setSelectedReligion(religion);
    toggleReligionModal();
  };
  const handleMotherTongueSelect = (motherTongue) => {
    setSelectedMotherTongue(motherTongue);
    toggleMotherTongueModal();
  };

  // Function to filter items based on search query for each dropdown
  const filterItems = (
    data,
    searchQuery,
    setSelectedItem,
    toggleModal
  ) => {
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <ScrollView>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.countryItem}
            onPress={() => {
              setSelectedItem(item);
              toggleModal();
            }}
          >
            <Text style={styles.countryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <LinearGradient
      colors={['#642B73', '#040004']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Country Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Country</Text>
          <TouchableOpacity onPress={toggleCountryModal}>
            <Text style={styles.input}>
              {selectedCountry?.name || 'Select Country'}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isCountryModalVisible}
          onBackdropPress={toggleCountryModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Country"
              value={searchCountry}
              onChangeText={(text) => setSearchCountry(text)}
            />
            {filterItems(
              Countries,
              searchCountry,
              handleCountrySelect,
              toggleCountryModal
            )}
          </View>
        </Modal>

       {/* State Dropdown */}
<View style={styles.inputContainer}>
  <Text style={styles.inputTitle}>State</Text>
  <TouchableOpacity onPress={toggleStateModal}>
    <Text style={styles.input}>
      {selectedState.name || 'Select State'}
    </Text>
  </TouchableOpacity>
</View>
<Modal
  isVisible={isStateModalVisible}
  onBackdropPress={toggleStateModal}
  style={styles.modal}
>
  <View style={styles.modalContent}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search State"
      value={searchState}
      onChangeText={(text) => setSearchState(text)}
    />
    {filterItems(
      filteredStates(),
      searchState,
      handleStateSelect,
      toggleStateModal
    )}
  </View>
</Modal>

        {/* City Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>City</Text>
          <TouchableOpacity onPress={toggleCityModal}>
            <Text style={styles.input}>
              {selectedCity.name || 'Select City'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isCityModalVisible}
          onBackdropPress={toggleCityModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search City"
              value={searchCity}
              onChangeText={(text) => setSearchCity(text)}
            />
            {filterItems(
              filteredCities(),
              searchCity,
              handleCitySelect,
              toggleCityModal
            )}
          </View>
        </Modal>

        {/* Community Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Community</Text>
          <TouchableOpacity onPress={toggleCommunityModal}>
            <Text style={styles.input}>
              {selectedCommunity.name || 'Select Community'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isCommunityModalVisible}
          onBackdropPress={toggleCommunityModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Community"
              value={searchCommunity}
              onChangeText={(text) => setSearchCommunity(text)}
            />
            {filterItems(
              communityData,
              searchCommunity,
              handleCommunitySelect,
              toggleCommunityModal
            )}
          </View>
        </Modal>

        {/* Religion Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Religion</Text>
          <TouchableOpacity onPress={toggleReligionModal}>
            <Text style={styles.input}>
              {selectedReligion.name || 'Select Religion'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isReligionModalVisible}
          onBackdropPress={toggleReligionModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Religion"
              value={searchReligion}
              onChangeText={(text) => setSearchReligion(text)}
            />
            {filterItems(
              religionData,
              searchReligion,
              handleReligionSelect,
              toggleReligionModal
            )}
          </View>
        </Modal>

        {/* MotherTongue Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>MotherTongue</Text>
          <TouchableOpacity onPress={toggleMotherTongueModal}>
            <Text style={styles.input}>
              {selectedMotherTongue.name || 'Select MotherTongue'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isMotherTongueModalVisible}
          onBackdropPress={toggleMotherTongueModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search MotherTongue"
              value={searchMotherTongue}
              onChangeText={(text) => setSearchMotherTongue(text)}
            />
            {filterItems(
              motherTongueData,
              searchMotherTongue,
              handleMotherTongueSelect,
              toggleMotherTongueModal
            )}
          </View>
        </Modal>
        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ffff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '70%',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  countryText: {
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
