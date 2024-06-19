import React, { useRef, useEffect,useState  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,StatusBar,Animated,Button,FlatList,Image ,Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import Entypo from 'react-native-vector-icons/dist/Entypo';
// import { FontAwesome5,AntDesign , Entypo} from 'react-native-vector-icons';

import colors from '../Assets/Colors/Colors';


    
  
 
export default function UpdateContactDetails({nav,onPress , details}) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const phoneNumber = '1234567890';
    const emailAddress = 'example@email.com';
    const handleButtonPress = () => {
      // Handle button press logic here
    };

    const handlePhonePress = () => {
        Communications.phonecall(phoneNumber, true);
      };
    
      const handleEmailPress = () => {
        Linking.openURL(`mailto:${emailAddress}`);
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
      duration: 1000, // Set the duration for the animation
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);


  return (
    <ScrollView>
    <Animated.View style={[styles.container, { paddingTop: insets.top, opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

  
    <View style={styles.card} onPress={onPress}>

<View style={styles.Contactdetails}>
<View style={styles.HeaderDeatils}>

<Text style={styles.title}>Contact Details</Text>
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
{/* <FontAwesome5 name="crown" size={24} color="red" /> */}
</View>
</View>

{details && details.user ? (
<TouchableOpacity style={styles.item}>
              <View style={styles.avatarContainer}>
                 <Icon name="phone" size={30} color={colors.primary} />
        {/* <FontAwesome5 name="phone" size={30} color={colors.primary} /> */}
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Phone</Text>
       
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.user.phone}</Text>
            {/* Show edit icon when data is available */}
           
          </View>
          </View>
    </TouchableOpacity>

        ) : (
          <View style={styles.rowContainer}>
            {/* Show add details button when no data is available */}
          
          </View>
        )}
   
   {details && details.user.email ? (
    <TouchableOpacity style={styles.item}>
              <View style={styles.avatarContainer}>
                {/* <Icon name="home" size={30} color={colors.primary} /> */}
        <Entypo name="mail" size={30} color={colors.primary} />
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.lastMessage}>Phone</Text>
        
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{details.user.email}</Text>
            {/* Show edit icon when data is available */}
          
          </View>
          </View>
    </TouchableOpacity>
        ) : (
          <View style={styles.rowContainer}>
            
          </View>
        )}
     
        </View>
    </Animated.View>
    </ScrollView>
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
    marginTop:-20,
    padding: 16,
  },
 
  button1:{
       alignSelf:'center',
       padding:10
  },
  PhoneNumber:{
    flexDirection:'row',
    marginTop:5,
    marginBottom:10,
    marginLeft:10
  },
  Mail:{
    flexDirection:'row' 
     
  },
  contact:{
    flexDirection:'column',
    marginLeft:20
  },
  iconText:{
    flexDirection:'row'
  },
  icon: {
    marginRight: 10,
    backgroundColor:'red',
    padding:10,
    borderRadius:20,
    width:40
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




