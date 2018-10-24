// import React from 'react';
import React, { Component } from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import { Body, Container, Content, Header, Image } from 'native-base'

/* import MainTabNavigator from './MainTabNavigator' */
import HomeScreen from '../screens/HomeScreen'
import CameraScreen from '../screens/CameraScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

class AppNavigator extends Component {
  render() {
    return <DrawerNavigation />
  }
}

const DrawerNavigation = createDrawerNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Home: {
      screen: HomeScreen,
    },
    Camera: {
      screen: CameraScreen,
    },
    Links: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => (
      <Container>
        <Header>
          <Body>
            {/* <Image
            source={require('../../assets/images/icon.png')}
          /> */}
          </Body>
        </Header>
        <Content>
          <DrawerItems {...props} />
        </Content>
      </Container>
    ),
    drawerPosition: 'left',
  },
)

export default AppNavigator
