import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, RefreshControl } from 'react-native';
import ProfileCard from '../../Components/ProfileCard';

import { useSelector } from 'react-redux';
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Matches() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const insets = useSafeAreaInsets();
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await profileApi.get_matchprofiles(token);
      setUsers(response.users);
      console.log(response.users.length,"jsjsjsjsjsjsjsas")
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await profileApi.get_matchprofiles(token);
        setUsers(response.users);
      console.log(response.users.length,"jsjsjsjsjsjsjsas")

      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfiles();
  }, []); // Empty dependency array to ensure useEffect runs only once

  const renderProfile = ({ item }) => (
    <ProfileCard
      key={item._id} // Adjust the key based on your profile object structure
      profile={item}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={users}
        renderItem={renderProfile}
        keyExtractor={(item) => item._id} // Adjust the key extractor based on your profile object structure
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff', '#0000ff']}
            tintColor="#0000ff"
            title="Loading..."
            titleColor={colors.primary}
          />
        }
      />
      {loading && !refreshing && (
        <ActivityIndicator size="large"  color="#0000ff" style={styles.loader} />
      )}
      {!loading && users.length === 0 && !refreshing && (
        <View style={{flex:1}}>
           <Text style={styles.noUsersText}>No Matches found.</Text>
       </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
