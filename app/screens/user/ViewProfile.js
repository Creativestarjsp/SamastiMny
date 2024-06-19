import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import UpdateAbout from '../../UpdateDetails/UpdateAbout';
import ConnectNow from '../../Components/ConnectNow';
import colors from '../../Assets/Colors/Colors';
import RNPreventScreenshot, { addListener } from 'react-native-screenshot-prevent';

import UpdateBasicDetails from '../../UpdateDetails/UpdateBasic';
import UpdateContactDetails from '../../UpdateDetails/UpdateCantact';
import UpdateFamilyDetails from '../../UpdateDetails/UpdateFamily';
import UpdateHoroScope from '../../UpdateDetails/UpdateHoroscope';
import { useSelector } from 'react-redux';
import UpdateCareerEdu from '../../UpdateDetails/UpdateCareer'
import profileApi from '../../Services/Api/profileApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ViewProfile = ({ route }) => {
  const { profileId } = route.params;
  const [details, setDetails] = useState(null);
  const [connection, setConnection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [privacy,setPrivacy]=useState(false)
  const token = useSelector((state) => state.auth?.token);
  const insets = useSafeAreaInsets();
   const activeplan = useSelector((state) => state.auth?.activeplan);
   useEffect(() => {
    // Enable screenshot prevention when the component mounts
    RNPreventScreenshot.enabled(true);

    // Add a listener to handle screenshot events
    const subscription = addListener(() => {
      console.log('Screenshot taken');
      // You can add custom logic when a screenshot is detected
      showAlert({
      title: 'Warning',
      message: 'You have taken a screenshot of the app. This is prohibited due to security reasons.',
      confirmText: 'I understand'
    });
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      RNPreventScreenshot.enabled(false); // Disable screenshot prevention
      subscription.remove(); // Remove the listener
    };
   }, []);
  
  
  const getProfiles = async () => {
      try {
        const response = await profileApi.getuserprofile(profileId,token);
        console.log(response.profile.user.privacy,"lll")
        // setPrivacy(response?.user?.privacy)
        setDetails(response.profile);
        setConnection(response.connection);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError(error.message);
        setLoading(false);
      }
  };
  
  useEffect(() => {
    

    getProfiles(profileId);
  }, [profileId]); // Added profileId to the dependency array

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
console.log(details.gothra,"lllsls");
  return (
    
    <ScrollView contentContainerStyle={styles.container}   showsVerticalScrollIndicator={false} >
      {details ? (
        <>
        
          <ConnectNow details={details} connection={connection} getProfiles={getProfiles} />
          
          {details.about ? (<UpdateAbout details={details} />) : ""}
          {details.occupation? <UpdateCareerEdu details={details}/> :""}
          
          <UpdateBasicDetails details={details} />
          {
            !details?.contactprivacy?(<UpdateContactDetails details={details}/>):""
          }
          
          {details?.fatherstatus ? (   <UpdateFamilyDetails details={details}/>) : ""}
          {details?.rashi? (  <UpdateHoroScope detailss={details}/>) : ""}
          
       {/* <UpdateHoroScope/> */}
        
        
        </>
      ) : (
        <View>
          <Text>No details available</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ViewProfile;
