// authActions.js
import { authenticateUser } from '../services/authService'; // Your authentication service
import * as Keychain from 'react-native-keychain';
import { LOGIN, LOGIN_SUCCESS, LOGOUT,ADD_USER_DATA, ACTIVE_PLAN, NOTIFICATIONS } from './Types';
import profileApi from '../Services/Api/profileApi';

// Action Creators
const loginSuccess = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const Add_User = (data) => ({
  type: ADD_USER_DATA,
   payload: data,
});

export const Active_Plan = (data) => ({
  type: ACTIVE_PLAN,
   payload: data,
});

export const Add_Notifications = (data) => ({
  type: NOTIFICATIONS,
   payload: data,
});

// Async Action Creator using Redux Thunk
export const login = (credentials) => async (dispatch) => {
  try {

console.log(credentials,"xyzz")
    // Store data securely using utility function
   await Keychain.setGenericPassword("token",credentials);
const user = await profileApi.getminprofile(credentials)
    console.log(user,"oplopolopl")
    // Dispatch success action with data
    dispatch(loginSuccess(credentials));
    dispatch(Add_User(user))
  } catch (error) {
    // Handle errors or dispatch failure action
    console.log('Login failed:', error);
    dispatch(logout())
    // dispatch(loginFailure(error));
  }
};

