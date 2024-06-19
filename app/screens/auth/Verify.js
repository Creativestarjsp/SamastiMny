import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authActions';
import authApi from '../../Services/Api/authApi';
import messaging from '@react-native-firebase/messaging';
import colors from '../../Assets/Colors/Colors';

export default function Verify({ route }) {
  const dispatch = useDispatch();
  const { phone,country_code, Prefix,notificationToken } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimeout, setResendTimeout] = useState(null);
  const [countdown, setCountdown] = useState(60); // Set your desired countdown time here
  const inputRefs = useRef([0, 1, 2, 3].map(() => React.createRef()));
  const [loading,setLoading]=useState(false)

  const handleVerify = async () => {
  try {
    // Convert each element in otp array to a number
    const enteredOtp = otp.map(Number).join('');
console.log(enteredOtp,"pepepe")
    if (!enteredOtp) {
      alert('Invalid OTP');
    }

    setLoading(true)
    // Corrected key from 'my-key' to 'fcmtoken'
    const token = await messaging().getToken();
    console.log("jdjdjd",token)
    
    const response = await authApi.phoneverify(country_code, phone,enteredOtp, token);
console.log(response)
    if (response.data.token) {
      console.log(response.data);
          setLoading(false)
      dispatch(login(response.data.token));
    }
  } catch (error) {
     setLoading(false)
    alert('Invalid OTP');
    console.log(error);
  }
};


  

  const handleTextChange = (text, index) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = text;
      return newOtp;
    });

    // Move focus to the next input
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const startResendTimeout = () => {
    setCountdown(60); // Reset countdown to the initial value
    setResendTimeout(
      setTimeout(() => {
        setResendTimeout(null);
      }, 60000)
    );
  };

  const Resend = async() => {
   
    try {
      
      const response = await authApi.generatehotp(country_code,phone)
      if(response){
        console.log(response.data)
        startResendTimeout()
      }
    } catch (error) {
      
      console.log(error)
    }
    
  };

  useEffect(() => {
   
    // Clear the timeout when the component is unmounted or when the countdown reaches 0
    return () => {
      if (resendTimeout) {
        clearTimeout(resendTimeout);
      }
    };
  }, [resendTimeout]);

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1));
    }, 1000);

    // Clear the interval when the component is unmounted or when the countdown reaches 0
    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  return (
    <LinearGradient
      colors={['rgba(100,43,115,1)', 'rgba(4,0,4,1)']}
      start={{ x: 0.1, y: 0.2 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={{ color: 'white', marginBottom: 10 }}>
          We sent OTP to this {Prefix} {phone}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleTextChange(text, index)}
            />
          ))}
        </View>

        
        
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}  disabled={loading}>

           {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
          )}
          
         
        </TouchableOpacity>

        <TouchableOpacity style={{ margin: 20, borderRadius: 30 }} onPress={Resend} disabled={resendTimeout !== null}>
          {resendTimeout !== null ? (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Resend in {countdown}s</Text>
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Resend</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  otpInput: {
    width: '20%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#ffff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
