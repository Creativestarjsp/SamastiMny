import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const requests =[]

const Profile = () => {
    const insets = useSafeAreaInsets();
  const renderRequestItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      {item.type === 'image' && <Image source={{ uri: item.content }} style={styles.image} />}
      {item.type === 'phone' && <Text style={styles.text}>{item.content}</Text>}
      {item.type === 'connect' && <Text style={styles.text}>{`Connect request from ${item.content}`}</Text>}
      <Text style={styles.status}>{item.status.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
    <FlatList
      data={requests}
      renderItem={renderRequestItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      />
      </View>
      );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  status: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
});

export default Profile;
