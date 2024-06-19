import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../Assets/Colors/Colors';

export default function ActivePlans({ subscription }) {
  // Get the current date
const currentDate = new Date();

  // Calculate remaining days
  const endDate = new Date(subscription.endDate);
  const timeDifference = endDate - currentDate;
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Format the last date
  const formattedLastDate = endDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let remainingDaysText;
  if (remainingDays === 0) {
    remainingDaysText = 'Today is the last day';
  } else if (remainingDays === 1) {
    remainingDaysText = '1 day remaining';
  } else {
    remainingDaysText = `${remainingDays} days remaining`;
  }
  
  return (
    <View>
      <TouchableOpacity style={styles.membershipOffer}>
        <Text style={styles.offerTitle}>{subscription.subscription.name}</Text>
        <View style={{ justifyContent: "space-between", flex: 1, flexDirection: "row" }}>
          <Text style={styles.offerPrice}>
            ₹{subscription.subscription.price}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            {subscription.subscription.duration} /{parseInt(subscription.subscription.duration) === 1 ? "Month" : "Months"}
          </Text>
          
        </View>
      <Text style={{ fontWeight: "600" }}>{`Last Date: ${formattedLastDate}`}</Text>
        <Text style={{ fontWeight: "600" }}>{remainingDaysText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 16,
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
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.primary,
    },
    membershipOffer: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    offerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary
   },
    offerPrice: {
      fontSize: 18,
      color: colors.secondary,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    offerDescription: {
      fontSize: 16,
      color: '#333',
    },
  });