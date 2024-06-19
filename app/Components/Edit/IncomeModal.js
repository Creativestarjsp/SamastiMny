import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export const IncomeModal = ({ isEditMode, selectedIncomeRange, setSelectedIncomeRange }) => {
  const incomeRanges = [
    { key: '1-5', label: '1 Lac to 5 Lacs' },
    { key: '5-10', label: '5 Lacs to 10 Lacs' },
    { key: '10+', label: 'Above 10 Lacs' },
  ];

  return (
    <View style={styles.preferenceItem}>
      <Text style={styles.preferenceTitle}>Income Range</Text>
      {isEditMode ? (
        <ModalSelector
          data={incomeRanges}
          initValue="Select Income Range"
          onChange={(option) => setSelectedIncomeRange(option)}
        >
          <TextInput
            style={styles.input}
            placeholder="Select Income Range"
            editable={isEditMode}
            value={selectedIncomeRange?.label}
          />
        </ModalSelector>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Select Income Range"
          editable={isEditMode}
          value={selectedIncomeRange?.label}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  preferenceItem: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

// Usage in your component
// <IncomeModal isEditMode={true} selectedIncomeRange={selectedIncomeRange} setSelectedIncomeRange={setSelectedIncomeRange} />
