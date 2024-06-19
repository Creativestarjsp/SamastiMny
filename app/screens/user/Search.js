import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesome5 } from '@expo/vector-icons'; // Import the search icon from FontAwesome
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
 
const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [issearched,setisSearched]=useState(false)
  const token = useSelector((state) => state.auth?.token);
     const user = useSelector((state) => state.auth?.user);
  const {userId}=user
// Function to calculate age based on date of birth
const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  
  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  
  return age;
};

 const handleSearch = async () => {
    try {
      setisSearched(true);

      // Reset search results before making a new search
      setSearchResults([]);

      const response = await profileApi.searchUsername(token, searchQuery);

      if (response) {
        setSearchResults(response?.users);
      }
    } catch (error) {
      setisSearched(true);
      console.log(error);
    }
  };

  const renderProfileCard = ({ item }) => {
    if (item.userId === userId) {
      // Exclude the current user from the search results
      return null;
    }

    return (
      <TouchableOpacity style={styles.profileCard} onPress={() => navigation.navigate('ViewProfiles', { profileId: item.user })}>
        {item?.profile_pic ? (
          <Image source={{ uri: item.profile_pic }} style={styles.profileImage} />
        ) : (
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.profileImage} />
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{item.fullName}</Text>
          <Text>{calculateAge(item.dateOfBirth)} years old</Text>
          <Text>{item?.city?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
   return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <FontAwesome5 name="search" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.preferencesButton} onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.buttonText}>Partner Preferences</Text>
      </TouchableOpacity>
      {searchResults.length === 0 ? (
        issearched ? <Text>No users found</Text> : <View></View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.userId}
          renderItem={renderProfileCard}
          showsVerticalScrollIndicator={false}
          style={styles.profileList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileList: {
    flex: 1,
  },
  preferencesButton: {
    backgroundColor:colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom:15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Search;
