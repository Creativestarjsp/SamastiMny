import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Country } from 'country-state-city';
import colors from '../../Assets/Colors/Colors';
import authApi from '../../Services/Api/authApi';

export default function Login() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const Countries = Country.getAllCountries();
 const [expoPushToken, setExpoPushToken] = useState('');
  const handleLogin = async () => {
    try {
      if (!phoneNumber || !selectedCountry) {
        return alert("Enter Valid Inputs");
      }
      setLoading(true);

      const netInfoState = await NetInfo.fetch();
      if (!netInfoState.isInternetReachable) {
        setLoading(false);
        alert('No internet connection. Please check your network settings.');
        return;
      }

       const response = await authApi.generatehotp(selectedCountry?.phonecode,phoneNumber);
      console.log(response.data);
  
      // Check if OTP generation is successful
      if (response) {
       
        setLoading(false)
        // Successfully generated OTP, proceed with handling login
        navigation.navigate("Verify", { country_code: selectedCountry?.phonecode, phone: phoneNumber, Prefix: selectedCountry.phonecode, notificationToken: expoPushToken });
        console.log('Login button pressed');
        console.log('Selected Country:', selectedCountry);
        console.log('Phone Number:', phoneNumber);

        
      } else if (response.status === 404) {
        // Handle user not found
        setLoading(false)
        alert('User not found');
      } else {
        // Handle OTP generation failure, show error message or retry
        setLoading(false)
        console.log('Error generating OTP:', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error during login:', error);
      alert("Something went wrong. Please try again.");
    }
  };

 const getIndia = async () => {
    try {
      const data = Country.getCountryByCode("IN");
      setSelectedCountry(data);
    } catch (error) {
      // Handle the error
      console.log("Error while fetching India data:", error);
    }
  };

  useEffect(() => {
    getIndia();
  }, []);

  const filterItems = (data, searchQuery) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    toggleCountryModal();
  };

  const toggleCountryModal = () => setCountryModalVisible(!isCountryModalVisible);

  return (
    <LinearGradient
      colors={['#642B73', '#040004']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Samasti Matrimony</Text>

        {/* Country Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Country</Text>
          <TouchableOpacity onPress={toggleCountryModal}>
            <Text style={styles.input}>{selectedCountry?.name || 'Select Country'}</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isCountryModalVisible} onBackdropPress={toggleCountryModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Country"
              value={searchCountry}
              onChangeText={(text) => setSearchCountry(text)}
            />
            {filterItems(Countries, searchCountry).map((country) => (
              <TouchableOpacity
                key={country.isoCode}
                style={styles.countryItem}
                onPress={() => {
                  handleCountrySelect(country);
                  toggleCountryModal();
                }}
              >
                <Text style={styles.countryText}>{country.name}</Text>
              </TouchableOpacity>
            ))}
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

        {/* Login Button */}
        {loading ? (
          <TouchableOpacity style={styles.loginButton}>
            <ActivityIndicator size="small" color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        )}

        {/* Register and Terms and Conditions */}
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Terms and Conditions pressed")}>
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent:"center"
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
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
  bottomLinks: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
});
