import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import colors from '../../Assets/Colors/Colors';
import { useSelector } from 'react-redux';
import connectionApi from '../../Services/Api/connectionApi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
const ConnectionRequests = () => {
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const {userId}=user
  console.log(user.userId,"lsklsskssksksk");
 const insets = useSafeAreaInsets();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
 const navigation = useNavigation();
  useEffect(() => {
    getConnections();
  }, []);

  const getConnections = async () => {
    try {
      const response = await connectionApi.getconnectionsRequests(token);
      console.log(response.connectionRequests, "connections");
      setConnections(response.connectionRequests);
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      console.log(`Accepted connection request with ID ${id}`);
      const accepted = "accepted";

      const response = await connectionApi.connectionstatus_update(id,accepted,token);
      if (response) {
        alert("Request Accepted");
        getConnections(); // Refresh the list after accepting
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      console.log(`Rejected connection request with ID ${id}`);
      const rejected = "rejected";

      const response = await connectionApi.connectionstatus_update(id,rejected,token);
      if (response) {
        alert("Request Rejected");
        getConnections(); // Refresh the list after rejecting
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderRequestItem = ({ item }) => {
  const isSender = userId?._id === item?.sender?._id;
console.log(isSender,"usssssssssserrr")
  return (
   <TouchableOpacity
  style={styles.item}
  onPress={() => {
    if (item.sender._id === userId?._id) {
      // Handle the case where the sender is the logged-in user
      // You may want to show a different screen or handle it differently
      navigation.navigate('ViewProfiles', { profileId: item?.receiver?._id });
      
      console.log('Sender is the logged-in user');
    } else {
      navigation.navigate('ViewProfiles', { profileId: item?.sender?._id });
    }
  }}
>
     <Image
  source={{ uri: item.sender._id === userId?._id ? item.receiver?.user_profile?.profile_pic : item.sender?.user_profile?.profile_pic }}
  style={styles.image}
/>
<View style={styles.content}>
        <Text style={styles.text}>
          {isSender
            ? `You sent a connection request to ${item?.receiver?.user_profile?.fullName}`
            : `${item?.sender?.user_profile?.fullName} sent you a connection request`}
        </Text>
        <Text style={styles.status}>{item.status.toUpperCase()}</Text>
        {item.status === 'pending' && !isSender ? (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => handleAccept(item._id)} style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReject(item._id)} style={[styles.button, styles.rejectButton]}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : (<View>
               <View style={styles.buttonsContainer}>
          
          </View>
        </View>)}
      </View>
    </TouchableOpacity>
  );
}


  const onRefresh = () => {
    setRefreshing(true);
    getConnections();
  };

  return (
<View style={[styles.container, { paddingTop: insets.top }]}>
    <FlashList
  data={connections}
  renderItem={renderRequestItem}
  keyExtractor={(item) => item._id.toString()}
   // Use contentContainerStyle
  estimatedItemSize={200}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[colors.primary]}
      tintColor={colors.primary}
      title="Refreshing..."
      titleColor={colors.primary}
    />
  }
/>

      {loading && !refreshing && (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      )}
      {!loading && connections.length === 0 && !refreshing && (
        
        <View style={{flex:1}}>
          <Text style={styles.noRequestsText}>No Connection Requests</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  rejectButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
  },
  noRequestsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConnectionRequests;
