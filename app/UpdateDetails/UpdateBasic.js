import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../Assets/Colors/Colors';
import { useNavigation } from '@react-navigation/native';

export default function UpdateBasicDetails({ details, nav, onPress }) {
  console.log(details.dateOfBirth, "ppooo");
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
const navigation=useNavigation()
  const handleButtonPress = () => {
    // Handle button press logic here
  };

  const handleEditPress = () => {
    // Handle button press logic here
  };

  const handleAddDetailsPress = () => {
    // Handle button press logic here
  };

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


  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top, opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.card} onPress={onPress}>
        <View style={styles.basicdetailsContainer}>
          <View style={styles.Headerwithicon}>
            <Text style={styles.title}>Basic Details </Text>
            <View style={styles.Edit}>
              <TouchableOpacity onPress={()=>navigation.navigate("EditBasic",{details:details})}>
                <View style={{ flexDirection: 'row' }}>
                  {nav === "update" ? (<Text style={{ color: colors.primary, marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Edit</Text>) : (<View></View>)}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* {details && details.dateOfBirth ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <AntDesign name="calendar" size={30} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Date of Birth</Text>
             
                <View style={styles.rowContainer}>
                  <Text style={styles.name}>{calculateAge(details.dateOfBirth)}</Text>
                </View>
                </View>
          </TouchableOpacity>
              ) : (
                <View style={styles.rowContainer}>
                  
                </View>
              )} */}
          

          {details && details.maritalStatus ? (
          <TouchableOpacity style={styles.item}>
            <View style={styles.avatarContainer}>
              <View style={styles.icons}>
                <FontAwesome5 name="user-friends" size={24} color={colors.primary} />
              </View>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.lastMessage}>Marital Status</Text>
            
                <View style={styles.rowContainer}>
                  <Text style={styles.name}>{details.maritalStatus}</Text>
                </View>
                </View>
          </TouchableOpacity>
              ) : (
                <View style={styles.rowContainer}>
                 
                </View>
              )}
          

          {details && details.religion ? (
          <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="book" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Religion</Text>
       
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.religion.name}</Text>
            {/* Show edit icon when data is available */}
           
          </View>
      </View>
      </TouchableOpacity>

        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}
    

    {details.community ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome5 name="users" size={24} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Community</Text>
        
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.community.name}</Text>
            {/* Show edit icon when data is available */}
           
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
            
          </View>
        )}
   




    {details && details.mothertongue ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="book" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Mother Tongue</Text>
       
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.mothertongue.name}</Text>
            {/* Show edit icon when data is available */}
           
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
      
          </View>
        )}
    


    {details.country ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <Entypo name="location" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Lives In</Text>
    
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.country}</Text>
            {/* Show edit icon when data is available */}
            
          </View>
             </View>
             </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}
   
   {details.Country ? (
   <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="home" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Grew Up In</Text>
     
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.Country}</Text>
            
          </View>
            </View>
            </TouchableOpacity>
        
            
        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
        
          </View>
        )}

{details.city ? (
   <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="home" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>City</Text>
     
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.city}</Text>
            
          </View>
            </View>
            </TouchableOpacity>
        
            
        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
        
          </View>
        )}

   {details.grewupcountry ? (
   <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="home" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Grew Up In</Text>
     
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.grewupcountry}</Text>
            
          </View>
            </View>
            </TouchableOpacity>
        
            
        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
        
          </View>
        )}
    
    {details.diet ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <MaterialCommunityIcons name="silverware-clean" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Diet Preference</Text>
       
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.diet}</Text>
            {/* Show edit icon when data is available */}
          
          </View>
          </View>
    </TouchableOpacity>

        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
           
          </View>
        )}
      {details.height ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
        <MaterialCommunityIcons name="human-male-height" size={24} color={colors.primary}  />
                </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Height</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.height}</Text>
            {/* Show edit icon when data is available */}
        
          </View>
          </View>
        </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}
    
    {details.native ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
        <MaterialCommunityIcons name="home" size={24} color={colors.primary}  />
                </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Native</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.native}</Text>
            {/* Show edit icon when data is available */}
        
          </View>
          </View>
        </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}


        
    {details.residencystatus ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
        <MaterialCommunityIcons name="home" size={24} color={colors.primary}  />
                </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Native</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.residencystatus}</Text>
            {/* Show edit icon when data is available */}
        
          </View>
          </View>
        </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}

        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
    marginTop: -20,
    padding: 16,
  },
  icons: {
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    color: colors.secondary,
  },
  Headerwithicon: {
    flexDirection: 'row',
    marginBottom: 1,
    justifyContent: 'space-between'
  },
  Details: {
    marginBottom: 20,
    marginLeft: 40,
    fontSize: 24,
  },
  birthDate: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  messageContent: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row'
  },
  lastMessage: {
    color: '#777',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDetailsButton: {
    padding: 5,
    marginTop: 10,
  },
  addDetailsButtonText: {
    textAlign: 'center',
    color: colors.primary,
  },
});
