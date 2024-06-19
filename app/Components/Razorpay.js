import React,{useState} from 'react';
import { View, Text, TouchableHighlight,ActivityIndicator } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import colors from '../Assets/Colors/Colors';
import paymentAPI from '../Services/Api/paymentApi';
import { useSelector } from 'react-redux';

export default function Razorpay({ amount,subscriptionId }) {
    console.log(amount,subscriptionId, "kkk");
    const token = useSelector((state) => state.auth?.token);
    const [loading, setloading] = useState(false);
    const handlePayment = (order_id) => {
        // Replace 'your_api_key' with your actual Razorpay API key
        const options = {
            order_id:order_id,
            description: 'Credits towards consultation',
            image: 'https://www.freepik.com/free-photos-vectors/s-logo-png',            
            key: 'rzp_test_VppoL1vLJQhcAl',
          
            name: 'Samasti Matrimony',
            prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
            },
            theme: { color: colors.primary },
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                // Handle success
                alert(`Success:`);
            })
            .catch((error) => {
                // Handle failure
                alert(`Something Went Wrong!`);
            });
    };


    const createOrder = async() => {
        try {
            setloading(true)
            const results = await paymentAPI.payment(token,subscriptionId)
            console.log(results)
            if (results.order_id) {
                handlePayment(results.order_id)
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    return (
        <View>
            {/* Your other components can go here */}

            {loading ?
                <TouchableHighlight >
                    <View
                    style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                    }}
                    >
                        
               
                        <ActivityIndicator size="small" color="#fff" /> 
                         </View>
            </TouchableHighlight>
               :
                <TouchableHighlight onPress={createOrder}>
                <View
                    style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white' }}>Make Payment</Text>
                </View>
            </TouchableHighlight>}
            
           
        </View>
    );
}
