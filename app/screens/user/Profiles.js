import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProfileCard from '../Components/ProfileCard';
import profileApi from '../Services/Api/profileApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Profiles() {
  const [users, setUsers] = useState();
 const insets = useSafeAreaInsets();
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await profileApi.getprofiles();
       console.log(response,"kdjhsjljssdds")// Assuming response.data is an array of user profiles
      } catch (error) {
        console.error('Error fetching profiles:', error);
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
