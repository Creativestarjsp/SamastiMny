import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import profileApi from '../../Services/Api/profileApi';
import { useSelector, useDispatch } from 'react-redux';
import { add_user_data } from '../Redux/Actions';
import EditBasic from '../../Components/Edit/EditBasic';
import EditAbout from '../../Components/Edit/EditAbout';
import EditCareerDetails from '../../Components/Edit/EditCareer';
import EditFamilyDetails from '../../Components/Edit/EditFamily';
import EditHoroscope from '../../Components/Edit/EditHoroscope';
import colors from '../../Assets/Colors/Colors';
import Privacy from '../../Components/Edit/Privacy';
import DownloadPdf from '../../Components/DownloadPdf';
import { Country, State, City } from 'country-state-city';


export default function ViewMore({ name, count, onPress }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [details, setDetails] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(details)
  
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    getProfileData();
  }, []);

  const toggleText = () => {
    if (showAll) {
      setDisplayText(longText.substring(0, maxLength));
    } else {
      setDisplayText(longText);
    }
    setShowAll(!showAll);
  };

  const getProfileData = async () => {
    try {
      setLoading(true);
      const response = await profileApi.getprofile(token);
      console.log(response,"kk")
      setDetails(response.profile);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView onAnimatedValueUpdate={null} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {details && (
          <>
            <EditAbout details={details} />
            <EditBasic details={details} />
            <EditCareerDetails details={details} />
            <EditFamilyDetails details={details} />
            <EditHoroscope details={details} />
            <Privacy details={details} />
          

            <View style={{padding:100}}>
                <TouchableOpacity style={styles.preferencesButton} onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.buttonText}>Partner Preferences</Text>
      </TouchableOpacity>
            </View>
         
          </>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  card: {
  
    borderRadius: 10,   
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
    padding: 16,
  },
 
  aboutContainer: {
    alignItems: 'center',
    marginBottom: 20,
    // padding:10
  },
  HeaderDeatils:{
    flexDirection:'row',
    justifyContent:'space-between'
    
  },
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf:'flex-start',
    alignContent:'flex-start'
  },
  button: {    
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems:'center',
    borderRadius:90,
    borderWidth:0.2
  },
  buttonText: {   
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  avatarContainer: {
    position: 'relative',
  
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:'#f8f8ff',
   
  },
  unreadBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
    preferencesButton: {
    backgroundColor:colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom:15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});