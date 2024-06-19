import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import generaldata from '../../Assets/GeneralData/generaldata';
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';

const EditFamily = ({ details }) => {
  // Add similar state variables for other fields
  const [selectedFatherStatus, setSelectedFatherStatus] = useState(null);
  const [selectedMotherStatus, setSelectedMotherStatus] = useState(null);
  const [selectedNativePlace, setSelectedNativePlace] = useState('');
  const [numberOfBrothers, setNumberOfBrothers] = useState('');
  const [numberOfSisters, setNumberOfSisters] = useState('');
  const [selectedFamilyType, setSelectedFamilyType] = useState(null);
  const [selectedFamilyValues, setSelectedFamilyValues] = useState(null);
  const [selectedFamilyAffluence, setSelectedFamilyAffluence] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  // Add similar data arrays for other fields
  const familyStatusData = [
    { key: 'alive', label: 'Alive' },
    { key: 'late', label: 'Late' },
    // Add other family status options
  ];

  const familyTypeData = [
    { key: 'joint', label: 'Joint' },
    { key: 'nuclear', label: 'Nuclear' },
    // Add other family type options
  ];

  const familyValuesData = [
    { key: 'traditional', label: 'Traditional' },
    { key: 'modern', label: 'Modern' },
    // Add other family values options
  ];

  const familyAffluenceData = [
    { key: 'affluent', label: 'Affluent' },
    { key: 'middleClass', label: 'Middle Class' },
    // Add other family affluence options
  ];
  const filterDataByType = (type) => {
    return generaldata.filter(item => item.type === type);
  };

  useEffect(() => {
    // Set initial values based on details prop
    // Add similar logic for other fields
    console.log(details.motherstatus,details.noofbro,details.noofsis,"llll")
    if (details?.fatherstatus) setSelectedFatherStatus({ key: details.fatherstatus._id, label: details.fatherstatus.name });
    if (details?.motherstatus) setSelectedMotherStatus({ key: details.motherstatus._id, label: details.motherstatus.name });
    if (details?.nativeplace) setSelectedNativePlace(details.nativeplace.toString());
    if (details?.noofbro) setNumberOfBrothers(details.noofbro.toString());
    if (details?.noofsis) setNumberOfSisters(details.noofsis.toString());
    if (details?.familytype) setSelectedFamilyType({ key: details.familytype._id, label: details.familytype.name });
    if (details?.familyvalues) setSelectedFamilyValues({ key: details.familyvalues._id, label: details.familyvalues.name });
    if (details?.familyaffluence) setSelectedFamilyAffluence({ key: details.familyaffluence._id, label: details.familyaffluence.name });
  }, [details]);


  const savedetails = async()=>{

    try {
      console.log(numberOfBrothers,numberOfSisters)
      const data={
        fatherstatus:selectedFatherStatus.key,
        motherstatus:selectedMotherStatus.key,
        nativeplace:selectedNativePlace,
        noofbro:parseInt(numberOfBrothers),
        noofsis:parseInt(numberOfSisters),
        familytype:selectedFamilyType.key,
        familyvalues:selectedFamilyValues.key,
        familyaffluence:selectedFamilyAffluence.key
      }
      const response = await profileApi.updatefamily(token,data)
      if(response){
        alert("Updated")
        toggleEditMode()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Family Details</Text>

          {isEditMode ? (
        <TouchableOpacity style={styles.editButton} onPress={savedetails}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
          {/* Father Status */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Father Status</Text>

            {isEditMode? <ModalSelector
            
            data={filterDataByType('Fatherstatus').map(item => ({ key: item._id.$oid, label: item.name }))}
              initValue="Select Father Status"
              onChange={(option) => setSelectedFatherStatus(option)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Father Status"
                editable={isEditMode}
                value={selectedFatherStatus?.label}
              />
            </ModalSelector>: <TextInput
                style={styles.input}
                placeholder="Select Father Status"
                editable={isEditMode}
                value={selectedFatherStatus?.label}
              />}
           
          </View>

          {/* Mother Status */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Mother Status</Text>
            {isEditMode?<ModalSelector
               data={filterDataByType('Motherstatus').map(item => ({ key: item._id.$oid, label: item.name }))}
              initValue="Select Mother Status"
              onChange={(option) => setSelectedMotherStatus(option)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Mother Status"
                editable={isEditMode}
                value={selectedMotherStatus?.label}
              />
            </ModalSelector>: <TextInput
                style={styles.input}
                placeholder="Select Mother Status"
                editable={isEditMode}
                value={selectedMotherStatus?.label}
              />}
            
          </View>

          {/* Native Place */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Native Place</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Native Place"
              value={selectedNativePlace}
              editable={isEditMode}
              onChangeText={(text) => setSelectedNativePlace(text)}
            />
          </View>

          {/* Number of Brothers */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Number of Brothers</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Number of Brothers"
              value={numberOfBrothers}
               editable={isEditMode}
              onChangeText={(text) => setNumberOfBrothers(text)}
              keyboardType="numeric"
            />
          </View>

          {/* Number of Sisters */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Number of Sisters</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Number of Sisters"
              value={numberOfSisters}
              editable={isEditMode}
              onChangeText={(text) => setNumberOfSisters(text)}
              keyboardType="numeric"
            />
          </View>

          {/* Family Type */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Family Type</Text>
            <ModalSelector
              data={filterDataByType('Familytype').map(item => ({ key: item._id.$oid, label: item.name }))}
              initValue="Select Family Type"
              onChange={(option) => setSelectedFamilyType(option)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Family Type"
                editable={false}
                value={selectedFamilyType?.label}
              />
            </ModalSelector>
          </View>

          {/* Family Values */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Family Values</Text>
            <ModalSelector
               data={filterDataByType('Familyvalues').map(item => ({ key: item._id.$oid, label: item.name }))}
              initValue="Select Family Values"
              onChange={(option) => setSelectedFamilyValues(option)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Family Values"
                editable={false}
                value={selectedFamilyValues?.label}
              />
            </ModalSelector>
          </View>

          {/* Family Affluence */}
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceTitle}>Family Affluence</Text>
            {isEditMode?<ModalSelector
                data={filterDataByType('Familyaffluence').map(item => ({ key: item._id.$oid, label: item.name }))}
              initValue="Select Family Affluence"
              onChange={(option) => setSelectedFamilyAffluence(option)}
            >
              <TextInput
                style={styles.input}
                placeholder="Select Family Affluence"
                editable={false}
                value={selectedFamilyAffluence?.label}
              />
            </ModalSelector>: <TextInput
                style={styles.input}
                placeholder="Select Family Affluence"
                editable={false}
                value={selectedFamilyAffluence?.label}
              />}
            
          </View>

          {/* Add similar blocks for other fields */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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

export default EditFamily;
