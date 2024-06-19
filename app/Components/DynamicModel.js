import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import generaldata from '../Assets/GeneralData/generaldata';
import Modal from 'react-native-modal';

const DynamicModalSelector = ({ category, onSelect }) => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const filterDataByType = (type) => {
    return generaldata.filter(item => item.type === type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = filterDataByType(category).map(item => ({ key: item._id.$oid, label: item.name }));
        if (category === "Country") {
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
    console.log(category, value, "ooo");
    onSelect(category, value);
    setSelectedValue(value.label);
  };

  // Country Selection Modal
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCountries = data.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCountryModal = () => {
    setCountryModalVisible(!isCountryModalVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{category}</Text>
      <ModalSelector
        data={data}
        initValue={`Select ${category}`}
        onChange={(option) => handleValueChange(option)}
      >
        <TextInput
          style={styles.input}
          placeholder={`Select ${category}`}
          value={selectedValue}
          editable={false}
        />
      </ModalSelector>

      {/* Country Selection Modal */}
      <Modal
        isVisible={isCountryModalVisible}
        onBackdropPress={toggleCountryModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Country"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <ScrollView>
            {filteredCountries.map((country) => (
              <TouchableOpacity
                key={country.key}
                style={styles.countryItem}
                onPress={() => {
                  handleValueChange(country);
                  toggleCountryModal();
                }}
              >
                <Text style={styles.countryText}>{country.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '70%',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  countryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  countryText: {
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

export default DynamicModalSelector;
