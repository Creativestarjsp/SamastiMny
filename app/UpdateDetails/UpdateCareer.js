import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../Assets/Colors/Colors';

 function UpdateCareerEdu({ onPress,details,nav }) {
 
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleButtonPress = () => {
    // Handle button press logic here
  };


  const handleEditPress = () => {
    // Handle button press logic here
  };
  const handleAddDetailsPress = () => {
    // Handle button press logic here
  };
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
          <Text style={styles.title}>Career & Education Details </Text>
          <View style={styles.Edit}>
      <TouchableOpacity onPress={handleButtonPress}>
        <View
          style={{
            // justifyContent:'space-between',
            flexDirection:'row',
            // justifyContent:'space-around'
          }}
        >
                  {nav=="update"?( <Text style={{ color: colors.primary,marginBottom:10,fontWeight:'bold',fontSize:20 }}>Edit</Text>):(<View></View>)}

        </View>
      </TouchableOpacity>
    </View>
          {/* <MaterialCommunityIcons name="file-document-multiple" size={35} color={colors.primary} /> */}
          </View>
        
          {details.occupation ? (
          <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome5 name="user-tie" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Occupation</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.occupation.name}</Text>
            {/* Show edit icon when data is available */}
            
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
           
          </View>
        )}
       {details.workingin ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome name="id-card" size={24} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Working In</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.workingin.name}</Text>
            {/* Show edit icon when data is available */}
            
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
           
          </View>
        )}
  
  {details.income ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          {/* <Fontisto name="wallet" size={30} color={colors.primary} /> */}
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Income</Text>
     
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.income}</Text>
            {/* Show edit icon when data is available */}
           
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
           
          </View>
        )}


      {details.qualification ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome5 name="user-graduate" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Qualification</Text>
      
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.qualification.name}</Text>
            {/* Show edit icon when data is available */}
          
          </View>
          </View>
    </TouchableOpacity>

        ) : (
          <View style={styles.rowContainer}>
           
          </View>
        )}
  

  {details?.college ? (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatarContainer}>
        <View style={styles.icons}>
          <FontAwesome5 name="university" size={30} color={colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>University</Text>
     
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.college[0]}</Text>
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
    // backgroundColor: colors.primary,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    color:colors.secondary,
   
  },
  Headerwithicon:{
flexDirection:'row',
marginBottom:1,
justifyContent:'space-between'
  },
  Details:{
  marginBottom:20,
  marginLeft:40,
  fontSize: 24,
  // flexDirection:'row'
},
birthDate:{
  flexDirection:'row'
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
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#777',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDetailsButton: {
    // backgroundColor: colors.primary,
    padding: 5,
    // borderRadius: 5,
    marginTop: 10,
  },
  addDetailsButtonText: {
    textAlign: 'center',
    color: colors.primary,

  },
});
export default UpdateCareerEdu;
