import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import colors from '../Assets/Colors/Colors';
import connectionApi from '../Services/Api/connectionApi';
import { useSelector } from 'react-redux';

const ConnectNow = ({ details, connection,getProfiles }) => {
  const [connectionuser, setConnection] = useState(connection);
  const token = useSelector((state) => state.auth?.token);
  const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth?.user);
  const {userId}=user
  const activeplan = useSelector((state) => state.auth?.activeplan);
  console.log(connection,details.imageprivacy,"hghsghsgsg")
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

 const sendRequest = async () => {
  try {
    setLoading(true); // Set loading to true to indicate the request is in progress

    const { user } = details; 
    let receiverId = user._id;
    console.log(receiverId,details,"kkssssssssssss")
    await connectionApi.createconnection(receiverId,token);

    // Update the connection status in the state
    setConnection("Pending");
getProfiles()
    // Display an alert indicating successful connection request
    alert('Connection Sent', 'Your connection request has been sent successfully.');
  } catch (error) {
    // If there's an error, set the connection status to false
    setConnection(false);


    console.log('Error creating connection:');

    // Display an alert indicating the error
   alert("Unable to send connection request. Please try again.")
  } finally {
    setLoading(false); // Set loading to false regardless of success or failure
  }
};



     return (
    <View style={styles.container}>
         <View style={styles.card}>
          {!details.imageprivacy ? (
  details?.profile_pic ? (
    <Image source={{ uri: details.profile_pic }} style={styles.profileImage} />
  ) : (
    <View />
  )
) : (
  <Image
    source={{
      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    }}
    style={styles.profileImage}
  />
)}


        <View style={styles.connectNowContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.profileName}>{details.fullName}</Text>
            <Text style={styles.profileDetails}>
              {details.dateOfBirth ? calculateAge(details.dateOfBirth) : ''} years old | {details.gender}
            </Text>
          </View>
     

             {userId === details?.user._id ? (
  <View></View>
) : (
  <View style={styles.connectionContainer}>
    {connection === "Connected" ? (
      <View style={styles.connectedStatus}>
        <Text style={styles.connectNowText}>Connected</Text>
      </View>
    ) : connection === "Pending" ? (
      <TouchableOpacity style={styles.connectNowButtonDisabled}>
        <Text style={styles.connectNowText}>Request in Pending</Text>
      </TouchableOpacity>
    ) : connection === "Connect Now" && activeplan ? (
      <TouchableOpacity
        style={styles.connectNowButton}
        onPress={sendRequest}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.connectNowText}>Connect Now</Text>
        )}
      </TouchableOpacity>
    ) : (
      <Text>Send Requests after Subscription</Text>
    )}
  </View>
)}

        
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
    elevation: 5, // Add elevation for a shadow effect
  },
  profileImage: {
    width: '100%',
    height: 500,
    resizeMode: 'contain', // Change to 'contain' if needed
    borderRadius: 10,
    marginBottom: 10,
  },
  connectNowContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  connectNowButton: {
    padding: 15,
    backgroundColor:"#fff",
    borderRadius: 30,
    borderWidth:1,
    borderColor:"grey"
  },
  connectNowText: {
    color:"#fff",
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    aspectRatio: 4 / 3, // Adjust the aspect ratio according to your preference
    borderRadius: 10,
    marginBottom: 10,
    resizeMode:"contain"
  },

  connectNowButton: {
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectNowButtonDisabled: {
    padding: 15,
    backgroundColor: '#E0E0E0', // Use a different color to indicate disabled state
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConnectNow;
