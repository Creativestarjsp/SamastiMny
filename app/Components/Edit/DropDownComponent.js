import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome, MaterialCommunityIcons, Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';

export default DropdownComponent = ({
  data,
  value,
  labelField,
  valueField,
  searchField,
  placeholder,
  searchPlaceholder,
  onFocus,
  onBlur,
  onChange,
  renderLeftIcon,
  focusedDropdown,
  iconColor,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Dropdown
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
        }}
        placeholderStyle={{ fontSize: 16 }}
        selectedTextStyle={{ fontSize: 16 }}
        inputSearchStyle={{ height: 40, fontSize: 16 }}
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        value={value}
        labelField={labelField}
        valueField={valueField}
        searchField={searchField}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        renderLeftIcon={() => renderLeftIcon(iconColor)}
      />
    </View>
  );
};