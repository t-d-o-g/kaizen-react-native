import React from 'react'
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'

import { Body, Container, Content, Header, Root, Thumbnail } from 'native-base'

/* import MainTabNavigator from './MainTabNavigator' */
import HomeScreen from '../screens/HomeScreen'
import CameraScreen from '../screens/CameraScreen'
import ImprovementScreen from '../screens/ImprovementScreen'

/* Screens to be used in a Stack Navigator */
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import AddTicket from '../screens/AddTicketScreen'
import TicketDetails from '../screens/TicketDetails'
import UpdateTicket from '../screens/UpdateTicket'

// import userInfo from '../../utils/userInfo'

const AppNavigator = () => (
  <Root>
    <DrawerNavigator />
  </Root>
)
const kaizenImg = require('../../assets/images/kaizen.png')

export default AppNavigator

/* returnDrawer = () => {
  const nullDrawer = {
    drawerLabel: () => null
  }
  userInfo.getUserInfo()
    .then(response => {
      if (response !== null) {
        console.log("LOGGEDIN")
        return nullDrawer
      }
      console.log("LOGGEDOUT")
      return nullDrawer
    })
    .catch(err => {
      throw err
    })
} */

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
    UpdateTicket: {
      screen: UpdateTicket,
    },
    TicketDetails: {
      screen: TicketDetails,
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

const DrawerNavigator = createDrawerNavigator(
  {
    // You could add another route here for autg/hentication.
    // Read more at https://reactnavigation.ordocs/en/auth-flow.html
    Home: {
      screen: StackNavigation,
    },
    Camera: {
      screen: CameraScreen,
    },
    Improvement: {
      screen: ImprovementScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => (
      <Container>
        <Header style={{ height: 150, backgroundColor: '#606060' }}>
          <Body>
            <Thumbnail
              large
              source={kaizenImg}
              square
              // source={{ kaizenImg }}
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
