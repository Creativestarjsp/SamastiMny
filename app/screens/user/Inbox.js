import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';

import { useSelector } from 'react-redux';
import chatApi from '../../Services/Api/chatApi';

const Inbox = () => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const userId = useSelector((state) => state.auth?.user?.userId);

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    try {
      const response = await chatApi.getAllconversations(token);
      setConversations(response.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getConversations();
  };

  const renderItem = ({ item }) => {
    const otherParticipant = item.participants.find(participant => participant._id !== userId);
  
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Chat",{conversationID:item._id,profile_pic:otherParticipant?.user_profile?.profile_pic})}>
        <View style={styles.avatarContainer}>
          {otherParticipant?.user_profile?.profile_pic ? <Image source={{ uri: otherParticipant?.user_profile?.profile_pic }} style={styles.avatar} /> : 
           <Image source={{ uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"  }} style={styles.avatar} />}
           
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.name}>{otherParticipant?.user_profile?.fullName}</Text>
          {item.lastMessage?.content && (
            <Text style={styles.lastMessage}>{item.lastMessage.content}</Text>
          )}
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
            tintColor="#689F38"
            title="Loading..."
            titleColor="#00ff00"
          />
        }
      />
      {loading && !refreshing && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {!loading && conversations.length === 0 && !refreshing && (
        <View style={{flex:1}}>
          <Text style={styles.noConversationsText}>No Conversations</Text>
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
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  flatList: {
    flex: 1,
  },
  noConversationsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Inbox;
