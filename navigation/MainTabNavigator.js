import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import PropTypes from 'prop-types';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const homeStackTabBarIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
  />
);

homeStackTabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: homeStackTabBarIcon,
};

const linkStackTabBarIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
  />
);

linkStackTabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: linkStackTabBarIcon,
};

const settingsStackTabBarIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
  />
);

settingsStackTabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: settingsStackTabBarIcon,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
