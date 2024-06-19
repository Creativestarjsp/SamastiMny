import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import Root from './app/navigation/rootNavigation'
import { Provider } from 'react-redux';
import store from './app/redux/store';

export default function App() {



  return (
  <Provider store={store}>
<Root/>
  </Provider>
  )
}