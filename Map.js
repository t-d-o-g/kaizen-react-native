/* eslint react/prefer-stateless-function: 0 */

import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Main from './mapIndex'
import TicketDetails from './ticketDetail'
import CreateTicket from './createTicket'
import UpdateTicket from './updateTicket'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Main,
    },
    TicketDetails: {
      screen: TicketDetails,
    },
    CreateTicket: {
      screen: CreateTicket,
    },
    UpdateTicket: {
      screen: UpdateTicket,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)

export default class Map extends React.Component {
  render() {
    return <RootStack />
  }
}
