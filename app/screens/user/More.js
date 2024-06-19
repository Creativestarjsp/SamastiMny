import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, RefreshControl, SafeAreaView } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import ProfileCard from '../../Components/ProfileCard';
import { useSelector } from 'react-redux';
import colors from '../../Assets/Colors/Colors';
import profileApi from '../../Services/Api/profileApi';

export default function More() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUsers([]);
    setPage(1);
    fetchProfiles(1);
  }, []);

  const fetchProfiles = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await profileApi.getprofiles(token,pageNumber);
      const newUsers = response.profiles || [];

      if (pageNumber === 1) {
        setUsers(newUsers);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      }

      setPage(response.currentPage);
      setHasMore(response.currentPage < response.totalPages);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const loadMoreProfiles = () => {
    if (loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    fetchProfiles(page + 1);
  };

  useEffect(() => {
    fetchProfiles(page);
  }, []);

  const renderProfile = ({ item }) => (
    <ProfileCard
      key={item._id}
      profile={item}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={users}
        renderItem={renderProfile}
     keyExtractor={(item, index) => item._id + index.toString()}
        onEndReached={loadMoreProfiles}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff', '#0000ff']}
            tintColor="#0000ff"
            title="Loading..."
            titleColor={colors.primary}
          />
        }
        estimatedItemSize={200}
      />

      {(loading || loadingMore) && !refreshing && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {!loading && users.length === 0 && !refreshing && !loadingMore && (
        <View style={{ flex: 1 }}>
          <Text style={styles.noUsersText}>No users found.</Text>
        </View>
      )}

      {!loading && !refreshing && !hasMore && (
        <View >
          <Text style={styles.noUsersText}>No more users to load.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 10,
    textAlign: 'center',
    color:colors.primary,
    marginTop: 10,
  },
});
