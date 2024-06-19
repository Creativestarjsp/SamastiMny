import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import generaldata from '../../Assets/GeneralData/generaldata';
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';
import { IncomeModal } from './IncomeModal';
const EditCareer = ({ details }) => {
  // Add similar state variables for other fields
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedWorkingIn, setSelectedWorkingIn] = useState(null);
  const [selectedIncomeRange,setSelectedIncomeRange]=useState(null)
  const [college, setCollege] = useState("");
    const [employer, setEmployer] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector((state) => state.auth?.token);
console.log(selectedIncomeRange,"sssss")
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const filterDataByType = (type) => {
    return generaldata.filter(item => item.type === type);
  };
  // Add similar data arrays for other fields
  const educationData = [
    { key: 'bachelor', label: 'Bachelor' },
    { key: 'master', label: 'Master' },
    // Add other education options
  ];

   const incomeRanges = [
    { key: '500000', label: '1 Lac to 5 Lacs' },
    { key: '100000', label: '5 Lacs to 10 Lacs' },
    { key: '150000', label: 'Above 10 Lacs' },
  ];
  const occupationData = [
    { key: 'engineer', label: 'Engineer' },
    { key: 'doctor', label: 'Doctor' },
    // Add other occupation options
  ];

  const workingInData = [
    { key: 'private', label: 'Private' },
    { key: 'public', label: 'Public' },
    // Add other working in options
  ];

  useEffect(() => {
    const {religion,
      gender,
      maritalStatus,
      country,
      occupation,
      mothertongue,
      community,
      education,
      state,
      diet,
      blood_group,
      workingin,
      college,
      qualification,
      employer_name,
      city,
    income} = details
      console.log(income,"Company")
    if (qualification) setSelectedEducation({ key: qualification._id, label: qualification.name });
    if (occupation) setSelectedOccupation({ key: occupation._id, label: occupation.name });
    if (workingin) setSelectedWorkingIn({ key: workingin._id, label: workingin.name });
    if (college) setCollege(college);
    if (employer_name) setEmployer(employer_name);
    if (income) {
      if (income == 500000) {
        setSelectedIncomeRange({ key: income.toString(), label: '1 Lac to 5 Lacs' });
      } else if (income == 1000000) {
         setSelectedIncomeRange({ key: income.toString(), label: '5 Lac to 10 Lacs' });
      } else {
         setSelectedIncomeRange({ key: income.toString(), label: 'Above 10 Lacs' });
      }
      
    } 
    console.log(selectedIncomeRange,"kkll")
  }, [details]);


  const savedetails = async()=>{

    try {
      
      const data={
        qualification:selectedEducation.key,
        occupation:selectedOccupation.key,
        workingin: selectedWorkingIn.key,
        college: college,
        employer_name: employer,
        income:selectedIncomeRange.key
      }
      const response = await profileApi.updatecareer(token,data)
      if(response){
        alert("Updated")
        toggleEditMode()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Text>Career Details</Text>
      {isEditMode ? (
        <TouchableOpacity style={styles.editButton} onPress={savedetails}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      {/* Education */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Qualification</Text>
        {isEditMode?<ModalSelector
        data={filterDataByType('Qualification').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Education"
          onChange={(option) => setSelectedEducation(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Education"
            editable={false}
            value={selectedEducation?.label}
          />
        </ModalSelector>: <TextInput
            style={styles.input}
            placeholder="Select Education"
            editable={false}
            value={selectedEducation?.label}
          />}
        
      </View>

      {/* Occupation */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Occupation</Text>
        {isEditMode? <ModalSelector
           data={filterDataByType('Occupation').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Occupation"
          onChange={(option) => setSelectedOccupation(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Occupation"
            editable={isEditMode}
            value={selectedOccupation?.label}
          />
        </ModalSelector>: <TextInput
            style={styles.input}
            placeholder="Select Occupation"
            editable={isEditMode}
            value={selectedOccupation?.label}
          />}
       
      </View>

      {/* Working In */}
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Working In</Text>
        {isEditMode?<ModalSelector
        data={filterDataByType('Workingin').map(item => ({ key: item._id.$oid, label: item.name }))}
          initValue="Select Working In"
          onChange={(option) => setSelectedWorkingIn(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Working In"
            editable={isEditMode}
            value={selectedWorkingIn?.label}
          />
        </ModalSelector>:   <TextInput
            style={styles.input}
            placeholder="Select Working In"
            editable={isEditMode}
            value={selectedWorkingIn?.label}
          />}
        
      </View>
<View style={styles.preferenceItem}>
      <Text style={styles.preferenceTitle}>Income Range</Text>
      {isEditMode ? (
        <ModalSelector
          data={incomeRanges}
          initValue="Select Income Range"
          onChange={(option) => setSelectedIncomeRange(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Income Range"
            editable={isEditMode}
            value={selectedIncomeRange?.label}
          />
        </ModalSelector>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Select Income Range"
          editable={isEditMode}
          value={selectedIncomeRange?.label}
        />
      )}
    </View>
      
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>Employer Name</Text>
       
          <TextInput
            style={styles.input}
            placeholder="Enter Your organization Name"
            editable={isEditMode}
          value={employer}
          onChangeText={(text) => setEmployer(text)}
          setEmployer
          />
        
        
      </View>

       <View style={styles.preferenceItem}>
        <Text style={styles.preferenceTitle}>College Name</Text>
       
          <TextInput
            style={styles.input}
            placeholder="Enter Your College Name"
            editable={isEditMode}
          value={college}
              onChangeText={(text) => setCollege(text)}
          />
        
        
      </View>

      {/* Add similar blocks for other fields */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"white",
    marginTop:50,
    marginBottom:50
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

export default EditCareer;
