import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import generaldata from '../Assets/GeneralData/generaldata';

const DynamicModalSelector2 = ({ category, onSelect }) => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filterDataByType = (type) => {
    return generaldata.filter(item => item.type === type);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = filterDataByType(category).map(item => ({ key: item._id.$oid, label: item.name }));
        if(category === "Country") {
          setData(filterDataByType(category).map(item => ({ key: item.code, label: item.name })));
        } else {
          setData(response);
        }
      } catch (error) {
        console.error(`Error loading ${category} data:`, error);
      }
    };

    fetchData();
  }, [category]);

  const handleValueChange = (value) => {
    onSelect(category, value);
    setSelectedValue(value.label);
  };

  const renderModalItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleValueChange(item)}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredData = data.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{category}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={renderModalItem}
        keyExtractor={(item) => item.key.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder={`Select ${category}`}
        value={selectedValue}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  card: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0', // Adjust the background color as needed
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
  },
  inputTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default DynamicModalSelector2;
