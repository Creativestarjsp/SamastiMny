import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../Assets/Colors/Colors';
import subscriptionApi from '../Services/Api/subscrptionApi';
import ActivePlans from './ActivePlans';
import { useSelector } from 'react-redux';

export default function MembershipCard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [exists, setExists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const token = useSelector((state) => state.auth?._j?.token);

  useEffect(() => {
    getallSubscriptions();
  }, []);

  useEffect(() => {}, [exists]);

  const getallSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptionApi.getSubscriptions(token);
      setExists(response.exsit);
      setSubscriptions(response.subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (subscriptionId) => {
    setExpandedCard((prev) => (prev === subscriptionId ? null : subscriptionId));
  };

  return (
    <View style={styles.container}>
      {Array.isArray(exists) && exists.length > 0 ? (
        <View>
          <Text style={styles.title}>Active Plan</Text>
          {exists.map((subscription) => (
            <ActivePlans key={subscription._id} subscription={subscription} />
          ))}
        </View>
      ) : (
        <View />
      )}

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
            <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
              <Text style={styles.offerPrice}>
                ₹{subscription.price} 
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                {subscription.duration} /{parseInt(subscription.duration) == 1 ? 'Month' : 'Months'}
              </Text>
            </View>

            {expandedCard === subscription._id && (
              <View>
                <Text style={styles.offerDescription}>{subscription.description}</Text>
                {/* Add any additional information you want to display */}
              </View>
            )}
          </TouchableOpacity>
        ))
      )}
    </View>
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
