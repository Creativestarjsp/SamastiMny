import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, RefreshControl,Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileComplete from '../../Components/ProfileComplete';
import Header from '../../Components/Header';
import SettingsCard from '../../Components/SettingsCard';
import MembershipUi from '../../Components/MembershipUi';
import Razorpay from '../../Components/Razorpay';
import { check, PERMISSIONS, request, RESULTS, openSettings } from 'react-native-permissions';
import PermissionAlertCard from '../../Components/PermissionAlertCard';
import colors from '../../Assets/Colors/Colors';
import { useSelector } from 'react-redux';
import Nearby from '../../Components/Nearby';
import Customercare from '../../Components/Customercare';
import Verification from '../../Components/Verification';
import subscriptionApi from '../../Services/Api/subscrptionApi';
import { useDispatch } from 'react-redux';
import { Active_Plan } from '../../redux/authActions';
export default function Home() {
    const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [isRefreshing, setRefreshing] = useState(false);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const activeplan = useSelector((state) => state.auth?.activeplan);
  const user = useSelector((state) => state.auth?.user);
    const token = useSelector((state) => state.auth?.token);
  const [subscriptions, setSubscriptions] = useState([]);
  console.log(subscriptions,"hjks");
  const [exists, setExists] = useState([]);
    const [loading, setLoading] = useState(true);
console.log(user,"qwe")
  const onRefresh = () => {
    // Your refresh logic goes here
    setRefreshing(true);

    // Simulating an asynchronous refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };


  useEffect(() => {
    if (!isRefreshing) {
      // Call API only when not triggered by manual refresh
      getallSubscriptions();
    }
  }, [isRefreshing]);

  const getallSubscriptions = async () => {
  try {
    setLoading(true);
    const response = await subscriptionApi.getSubscriptions(token);
    setExists(response.exsit);

    if (response?.exsit.length > 0) {
      const activeSubscription = response.exsit.find((subscription) => {
        const endDate = new Date(subscription.endDate);
        const today = new Date();
        return endDate > today;
      });

      const endDate = activeSubscription ? new Date(activeSubscription.endDate) : null;
const remainingDays = endDate ? Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24)) : null;
    
      const data = {
        activeplan: !!activeSubscription,
        endDate: remainingDays,
      };

      console.log(data,"daaaaatatat")
      dispatch(Active_Plan(data));
    } else {
      // Handle the case when there are no subscriptions
      dispatch(Active_Plan(false));
    }

    setSubscriptions(response.subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
  };
  

  return (
  <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} translucent />
      <Header />
     {/* {showPermissionAlert && <PermissionAlertCard onCancelPress={cancelPermissionRequest} />} */}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileComplete onRefresh={isRefreshing} />
        <Nearby onRefresh={isRefreshing}/>
        
        {activeplan ? (
  <View>
    {/* Render something for active plan */}
  </View>
) : (
  subscriptions ? (
    <MembershipUi onRefresh={isRefreshing} subscriptions={subscriptions} exists={exists} loading={loading} />
  ) : (
    <View></View>
  )
)}

     
       {/* <MembershipUi onRefresh={isRefreshing}/> */}
       <Verification/>
        <SettingsCard />
         <Customercare/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
