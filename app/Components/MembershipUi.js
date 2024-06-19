import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import colors from '../Assets/Colors/Colors';
import { useDispatch } from 'react-redux';
import ActivePlans from './ActivePlans';
import { useSelector } from 'react-redux';
import subscriptionApi from '../Services/Api/subscrptionApi';
import Razorpay from './Razorpay';
import { Active_Plan } from '../redux/authActions';

export default function MembershipUi({ onRefresh,subscriptions,exists,loading }) {
 console.log(subscriptions,"ksk")

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const [showMembershipBenefits, setShowMembershipBenefits] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Define expandedCard state

  



  const handleRefresh = () => {
    setRefreshing(true);
   
  };

  const handleTakeMembershipClick = () => {
    setShowMembershipBenefits(true);
  };

  const toggleExpand = (subscriptionId) => {
    setExpandedCard((prev) => (prev === subscriptionId ? null : subscriptionId));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {Array.isArray(exists) && exists.length > 0 && (
        <View>
          <Text style={styles.title}>Active Plan</Text>
          {exists.map((subscription) => (
            <ActivePlans key={subscription._id} subscription={subscription} />
          ))}
        </View>
      )}

      {showMembershipBenefits ? (
        <View>
          <Text style={styles.title}>Membership Benefits</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            subscriptions.map((subscription) => (
              <TouchableOpacity
                key={subscription._id}
                style={styles.membershipOffer}
                onPress={() => toggleExpand(subscription._id)}
              >
                <Text style={styles.offerTitle}>{subscription.name}</Text>
                <View style={styles.offerDetails}>
                  <Text style={styles.offerPrice}>₹{subscription.price} </Text>
                  <Text style={styles.offerDuration}>
                    {subscription.duration} {parseInt(subscription.duration) === 1 ? 'Month' : 'Months'}
                  </Text>
                </View>

                {expandedCard === subscription._id && (
                  <View>
                    <Text style={styles.offerDescription}>{subscription.description}</Text>
                    {/* Add any additional information you want to display */}
                    <View>
                      <Razorpay amount={subscription.price} subscriptionId={subscription._id} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      ) : (
        <TouchableOpacity style={styles.takeMembershipButton} onPress={handleTakeMembershipClick}>
          <Text style={styles.takeMembershipButtonText}>Take Membership</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
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
    color: colors.primary,
  },
  offerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerPrice: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  offerDuration: {
    fontSize: 16,
    color: '#555',
  },
  offerDescription: {
    fontSize: 16,
    color: '#333',
  },
   takeMembershipButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  takeMembershipButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
