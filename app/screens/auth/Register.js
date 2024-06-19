import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString()); // Convert Date to ISO string
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
console.log(dateOfBirth)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setLookingFor(selectedGender === 'Male' ? 'Female' : 'Male');
    toggleModal();
  };

   const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Divorcing'];
  const [isMaritalStatusModalVisible, setMaritalStatusModalVisible] = useState(false);

  const toggleMaritalStatusModal = () => {
    setMaritalStatusModalVisible(!isMaritalStatusModalVisible);
  };

  const selectMaritalStatus = (selectedStatus) => {
    setMaritalStatus(selectedStatus);
    toggleMaritalStatusModal();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate.toISOString()); // Convert Date to ISO string
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  //  const validateAndNavigate = () => {
  //  navigation.navigate("Contact",{
   
  //     name:"jsp",
  //     gender:"Male",
  //     maritalStatus:"Single",
  //     lookingFor:"Female",
  //     dateOfBirth:20-22-2000,
    
  // });
  //  }
  
  const validateAndNavigate = () => {
  // Validation
  if (name.trim() === '') {
    alert('Please enter your name');
    return;
  }

  if (gender.trim() === '') {
    alert('Please select your gender');
    return;
  }

  if (!dateOfBirth) {
    alert('Please select your date of birth');
    return;
  }

  // Check age requirement based on gender
  const today = new Date();
  const age = today.getFullYear() - new Date(dateOfBirth).getFullYear();

  if ((gender === 'Male' && age <= 21) || (gender === 'Female' && age < 18)) {
    alert('Age requirement not met.');
    return;
  }

    if (!maritalStatus) {
       alert('Marital Status is Required ');
    return;
    }
  // Additional validations for other fields can be added here

  // If all validations pass, navigate to the Contact screen
  navigation.navigate("Contact",{
   
      name,
      gender,
      maritalStatus,
      lookingFor,
      dateOfBirth,
    
  });
};


  return (
    <LinearGradient colors={['#642B73', '#040004']} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Register</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder='Enter Your Name'
            placeholderTextColor='#fff'
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity style={styles.input} onPress={toggleModal}>
            <Text style={{ color: '#fff' }}>{gender || 'Select Gender'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={showDatepicker}
          >
            <Text style={{ color: '#fff' }}>
              {dateOfBirth.substring(0, 10) || 'Pick Date of Birth'} {/* Display only the date part */}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
      <Text style={styles.label}>Marital Status</Text>
      <TouchableOpacity style={styles.input} onPress={toggleMaritalStatusModal}>
        <Text style={{ color: '#fff' }}>{maritalStatus || 'Marital Status'}</Text>
      </TouchableOpacity>
    </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Looking For</Text>
          <TouchableOpacity style={styles.input} onPress={toggleModal}>
            <Text style={{ color: '#fff' }}>
              {lookingFor || 'Looking For'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={validateAndNavigate}>
          <Text style={styles.registerButtonText}>Next</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID='dateTimePicker'
            value={new Date(dateOfBirth)} // Pass a Date object
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => selectGender('Male')}
          >
            <Text style={styles.modalOptionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => selectGender('Female')}
          >
            <Text style={styles.modalOptionText}>Female</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isMaritalStatusModalVisible} onBackdropPress={toggleMaritalStatusModal}>
      <View style={styles.modalContainer}>
        {maritalStatusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            style={styles.modalOption}
            onPress={() => selectMaritalStatus(status)}
          >
            <Text style={styles.modalOptionText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </Modal>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}> Login here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#642B73',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    color: '#642B73',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
