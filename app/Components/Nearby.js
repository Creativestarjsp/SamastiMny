import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';

import profileApi from '../Services/Api/profileApi';
import { useSelector } from 'react-redux';
import ProfileHorizontalCard from './ProfileHorizotalCard';

const Nearby = ({ onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const token = useSelector((state) => state.auth?.token);

  const getNearby = async () => {
    try {
      setLoading(true);
      const response = await profileApi.get_nearby(token);
      setProfiles(response?.profiles || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNearby();
  }, [token, onRefresh]); // Include 'token' and 'onRefresh' in the dependency array

  const handleRefresh = () => {
    if (onRefresh) {
      getNearby();
    }
  };

  return (
    <View style={styles.container}>
      {profiles.length > 0 ? (
        <>
          <Text style={styles.title}>Nearby</Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
              }
            >
              {profiles.map((profile) => (
                <ProfileHorizontalCard
                  key={profile._id}
                  profileId={profile.user}
                  name={profile.fullName}
                  age={calculateAge(profile.dateOfBirth)}
                  gender={profile.gender}
                  profile_pic={profile.profile_pic}
                  privacy={profile.imageprivacy}
                />
              ))}
            </ScrollView>
          )}
        </>
      ) : (
        <View>
          {/* Render something when there are no profiles */}
          <Text>No profiles nearby</Text>
        </View>
      )}
    </View>
  );
};

const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
};

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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default Nearby;
