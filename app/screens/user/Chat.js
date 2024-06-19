import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import chatApi from '../../Services/Api/chatApi';

export default function Chat({ route }) {
  const { conversationID, profile_pic } = route?.params;
  const token = useSelector((state) => state.auth?.token);
  const userId = useSelector((state) => state.auth?.user?.userId?._id);
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    try {
      const response = await chatApi.getAllMessages(token, conversationID, page);

      const receiverId = response.messages.length > 0 ? response.messages[0].receiver._id : null;
      setReceiverId(receiverId);

      // Format messages from API response
      const formattedMessages = response.messages.map((message) => ({
        _id: message._id,
        text: message.content,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.sender._id === userId ? 1 : 2,
          name: message.sender.username,
          avatar: profile_pic,
        },
      }));

      setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedMessages));
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const onSend = async (newMessages = []) => {
    try {
      const message = {
        conversationId: conversationID,
        sender: userId,
        receiver: receiverId,
        content: newMessages[0].text,
      };

      const response = await chatApi.createMessage(token, message);

      const sentMessage = {
        _id: response.newMessage._id,
        text: response.newMessage.content,
        createdAt: new Date(response.newMessage.timestamp),
        user: {
          _id: 1,
          name: 'USER',
          avatar: profile_pic,
        },
      };

      setMessages((prevMessages) => [...prevMessages, sentMessage]);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const loadMoreMessages = () => {
    setPage(page + 1);
  };

  return (
    <View style={{ flex: 1, marginBottom: 10, padding: 10 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'USER',
          avatar: profile_pic,
        }}
        inverted={false}
        loadEarlier={messages.length > 0} // Display "Load earlier messages" when there are messages
        onLoadEarlier={loadMoreMessages} // Callback when "Load earlier messages" is pressed
      />
    </View>
  );
}
