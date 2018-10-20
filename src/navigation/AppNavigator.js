// import React from 'react';
import { createDrawerNavigator } from 'react-navigation'

/* import MainTabNavigator from './MainTabNavigator' */
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

export default createDrawerNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: {
    screen: HomeScreen,
  },
  /* Camera: {
    screen: CameraScreen
  }, */
  Links: {
    screen: LinksScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
})
