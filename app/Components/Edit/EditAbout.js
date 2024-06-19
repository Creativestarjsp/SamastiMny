import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import colors from '../../Assets/Colors/Colors';

import { useSelector } from 'react-redux';
import profileApi from '../../Services/Api/profileApi';

const EditAbout = ({ details, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayText, setDisplayText] = useState(details ? details.about || '' : '');
  const [loading,setLoading]=useState(false)
  const token = useSelector((state) => state.auth?.token);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {

    try {
      setLoading(true)
      if(displayText){
        const response = await profileApi.updateabout(token,displayText)
        console.log(response)
        setIsEditing(false);
        setLoading(false)
        alert("Updated")
       
        
      }else{
        setLoading(false)
        alert("About Should not be Empty")
      }
      
      // onSave(displayText);
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert("Something Went Wrong")
      
    }
  };

if(loading){

  return(
    <View>
       <ActivityIndicator size="small" color="#0000ff" />
    </View>
  )
}

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>About Yourself</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              placeholder="Type something..."
              value={displayText}
              onChangeText={(text) => setDisplayText(text)}
              multiline={true}
            />
          ) : (
            <Text style={styles.displayText}>{displayText}</Text>
          )}
          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
    padding: 16,
    position: 'relative',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 0.2,
    marginBottom: 10,
    paddingLeft: 10,
  },
  displayText: {
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 70,
    alignItems: 'center',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 70,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    color: 'white',
  },
});

export default EditAbout;
