import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
const Notifications = () => {
    // Dummy notifications array
    
    const notifications = useSelector((state) => state.auth?.notifications);


  // Render each notification item
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.title}</Text>
      <Text style={styles.notificationBody}>{item.body}</Text>
    </View>
  );
    
    if (notifications.length == 0) {
        
        return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            
            <Text style={{fontWeight:"bold"}}>No Notifications</Text>
        </View>)
    }

  return (
    <View style={styles.container}>   
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationBody: {
    fontSize: 16,
    color: '#555',
  },
});

export default Notifications;
