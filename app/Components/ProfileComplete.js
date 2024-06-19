import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl,ActivityIndicator } from 'react-native';
import Svg, { Circle, ClipPath, Image } from 'react-native-svg';
import colors from '../Assets/Colors/Colors';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import profileApi from '../Services/Api/profileApi';
import { Add_User } from '../redux/authActions';
import { tags } from 'react-native-svg/lib/typescript/xml';

export default function ProfileComplete({onRefresh}) {
  const [userdata, setUserdata] = useState({});
  const navigation = useNavigation();
  const [progress, setProgress] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const activeplan = useSelector((state) => state.auth?.activeplan);
  const plan = useSelector((state) => state.auth?.plan);


  
  const dispatch=useDispatch()
console.log(user?.profile_pic,"kkk")
  
  const get_profile = async() => {
  
    try {
      
      const response = await profileApi.getminprofile(token)
      console.log(response, "ereerererer")
      dispatch(Add_User(response))
      
    } catch (error) {

      console.log(error)
      
    }
}

  useEffect(() => {
   
    if (onRefresh) {
      get_profile()
    }
  }, [onRefresh])
  
  return (
    <View style={styles.card}>
      
      {onRefresh ? <View style={styles.cardContent}>
          <ActivityIndicator size="small" color="#0000ff" />
      </View> :
     <View style={styles.cardContent}>
        <Svg height="140" width="140" style={styles.svgContainer}>
          <ClipPath id="circleClip">
            <Circle cx="70" cy="70" r="64" />
          </ClipPath>
          <Circle
            cx="70"
            cy="70"
            r="64"
            stroke={colors.primary}
            strokeWidth="12"
            strokeDasharray={`${(2 * Math.PI * 64 * Math.round(user?.profilePercentage)) / 100}, 339`}
            fill="transparent"
          />
          

         
          <Image onPress={()=>navigation.navigate("Image")}
            href={{ uri:user?.profile_pic }}
            width="140"
            height="140"
            clipPath="url(#circleClip)"
            preserveAspectRatio="xMidYMid slice"
            />
            
        </Svg>

        <Text style={styles.title}>
          {user?.fullName ? user?.fullName.charAt(0).toUpperCase() + user?.fullName.slice(1) : ''}
        </Text>

        {user?.profilePercentage < 98 ? (
          <Text style={styles.description}>Please Complete Profile 100%.</Text>
        ) : (
          <View />
        )}

        <Text style={styles.profileDetails}>
          {user?.age} years old | {user?.maritalStatus}
          </Text>
          
       
        <View>
          {user?.profilePercentage < 98 ? (
            <>
              <Text style={styles.progress}>Progress: {user?.profilePercentage ? Math.round(user?.profilePercentage) : 0}%</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Update', { routefrom: 'home', id: 0 })}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Update')}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            )}
            
           
          </View>
          
      </View>
  
     }
      
      {activeplan ? (
  <View style={{ alignItems: "center", alignContent: "center", flexDirection: "row", flex: 1, justifyContent: "center" }}>
    <View style={styles.premium}>
      <Text style={styles.buttonText2}>Premium</Text>
      {plan ? (
        <Text style={{ textAlign: "center",fontSize:10 }}>
          {parseInt(plan) > 0 ? `${plan} Days ` : `${plan} Day `}
        </Text>
      ) : null}
    </View>
  </View>
) : null}

      
    </View>
  );
}



const styles = StyleSheet.create({
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
    margin: 16,
    padding:10
  },
  cardContent: {
    alignItems: 'center',
  },
  svgContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  progress: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color:colors.primary,
  },
  button: {
    backgroundColor:colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom:50
  },
   premium: {
    backgroundColor:"#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    
    alignSelf: 'flex-start',
    marginBottom:20
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   buttonText2: {
    color:colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  maritalStatusText: {
    fontSize: 18,
    color: "#555",
  },
  profileDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  tags: {
    backgroundColor: colors.primary,
    padding: 5,
    color: "white",
    borderRadius:30
  }
});
