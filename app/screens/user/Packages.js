import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import subscriptionApi from '../../Services/Api/subscrptionApi';
import { useSelector } from 'react-redux';
import colors from '../../Assets/Colors/Colors';

const Packages = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exists,setexists]=useState([])
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    getallSubscriptions();
  }, [refreshing]);

  const getallSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptionApi.getSubscriptions(token);
      console.log(response.exsit, "kkkll")
      setexists(response.exsit)
      setSubscriptions(response.subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderPackageItem = ({ item }) => (
    <TouchableOpacity style={styles.packageContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.packageTitle}>{item.name}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.packagePrice}>{`₹${item.price.toFixed(2)}`}</Text>
        {item.description && <Text style={styles.description}>{item.description}</Text>}
        {item.benefits && (
          <Text style={styles.packageBenefits}>{item.benefits.join('\n')}</Text>
        )}
      
 {/* Check if the current package is an existing subscription */}
{exists?.some(
  (existing) =>
    existing.subscription &&
    existing.subscription._id === item._id
) && (
  <Text style={styles.existingSubscriptionText}>
    You are subscribed to this package until {new Date(exists[0].endDate).toLocaleDateString()}
  </Text>
)}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && !refreshing && <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />}
      <FlatList
        data={subscriptions}
        renderItem={renderPackageItem}
        keyExtractor={(item) => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.primary]} />
        }
      />
      {!loading && subscriptions.length === 0 && !refreshing && (
        <Text style={styles.noPackagesText}>No packages available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 16,
  },
  packageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    padding: 16,
  },
  packagePrice: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 8,
  },
  packageBenefits: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  noPackagesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: colors.primary,
  },
  existingSubscriptionText: {
  fontSize: 14,
  color: 'green',
  marginTop: 8,
},

});

export default Packages;
