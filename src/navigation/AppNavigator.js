// import React from 'react';
import React from 'react'
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'

import { Body, Container, Content, Header, Thumbnail } from 'native-base'

/* import MainTabNavigator from './MainTabNavigator' */
import HomeScreen from '../screens/HomeScreen'
import CameraScreen from '../screens/CameraScreen'
import EditProfile from '../screens/EditProfile'

/* Screens to be used in a Stack Navigator */
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import AddTicket from '../screens/AddTicketScreen'

const AppNavigator = () => {
  return <DrawerNavigation />
}

export default AppNavigator

const StackNavigation = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    AddTicket: {
      screen: AddTicket,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      headerVisible: false,
    },
  },
)

const DrawerNavigation = createDrawerNavigator(
  {
    // You could add another route here for autg/hentication.
    // Read more at https://reactnavigation.ordocs/en/auth-flow.html
    Home: {
      screen: StackNavigation,
    },
    Camera: {
      screen: CameraScreen,
    },
    EditProfile: {
      screen: EditProfile,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => (
      <Container>
        <Header style={{ height: 150 }}>
          <Body>
            <Thumbnail
              large
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
              style={{ alignSelf: 'center' }}
            />
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

/* const StackNavigation = createStackNavigator({

}) */
