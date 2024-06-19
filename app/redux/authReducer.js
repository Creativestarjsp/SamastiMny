import * as Keychain from 'react-native-keychain';
import { LOGIN, LOGIN_SUCCESS, LOGOUT,ADD_USER_DATA, ACTIVE_PLAN, NOTIFICATIONS } from './Types';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  userId: '',
  fcm: null,
  activeplan: false,
  plan:"",
  notifications: [],
  userdetails: {
    Name: null,
    profileCreatedFor: null,
    dob:null
    
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const token = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        token: token,
       
      };
    case ADD_USER_DATA:
      const user = action.payload
      return {
        ...state,
        user:user
      }
    
     case ACTIVE_PLAN:
      const { activeplan,endDate } = action.payload
      return {
        ...state,
        activeplan: activeplan,
        plan:endDate
      }
      
      case NOTIFICATIONS:
      const data = action.payload
      return {
        ...state,
        notifications:[...state.notifications,data]
      }
      
      
    case LOGOUT:
      // Remove the token from Keychain
      Keychain.resetGenericPassword();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        userId: '',
        activeplan: false,
        plan:""
      };
    default:
      return state;
  }
};

export default authReducer;