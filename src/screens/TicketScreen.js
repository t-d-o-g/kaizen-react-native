import React, { Component } from 'react'
import { StatusBar, Text } from 'react-native'
import {
  Container,
  Header,
  Body,
  Content,
  ListItem,
  Left,
  Right,
  Icon,
  Separator,
} from 'native-base'
import API from '../../utils/API'
import userInfo from '../../utils/userInfo'

export default class ListSeparatorExample extends Component {
  static navigationOptions = {
    title: 'Improvements',
  }

  constructor(props) {
    super(props)
    this.state = {
      userTickets: [],
    }
  }

  componentDidMount() {
    const userTickets = []
    let userTicket = {}

    const tickets = userInfo
      .getUserInfo()
      .then(response => {
        if (response !== null) {
          return API.getTicketsByUserId(response.id)
        }
        userTicket = 'Login to see your improvements.'
        userTickets.push(userTicket)
        return undefined
      })
      .catch(err => {
        throw err
      })

    tickets
      .then(response => {
        if (response !== undefined) {
          if (response.data.length === 0) {
            userTicket = 'You do not have any improvements yet.'
            userTickets.push(userTicket)
          } else {
            for (let i = 0; i < response.data.length; i++) {
              userTicket = response.data[i].Ticket.ticket
              userTickets.push(userTicket)
            }
          }
        }

        this.setState({
          userTickets,
        })
      })
      .catch(err => {
        throw err
      })
  }

  render() {
    const { navigation } = this.props
    const { userTickets } = this.state
    return (
      <Container>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#282828' }}>
          <Left>
            <Icon
              name="md-menu"
              style={{ color: 'white' }}
              onPress={() => navigation.openDrawer()}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Separator>
            <Text>My Improvements</Text>
          </Separator>
          {userTickets.map((userTicket, i) => (
            /* eslint-disable react/no-array-index-key */
            <ListItem key={i}>
              <Left>
                <Text>{userTicket}</Text>
              </Left>
              <Right>
                <Icon type="FontAwesome" name="angle-right" />
              </Right>
            </ListItem>
            /* eslint-enable react/no-array-index-key */
          ))}
          <Separator>
            <Text>Improvements I like</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>You have not liked any improvements yet.</Text>
            </Left>
            <Right>
              <Icon type="FontAwesome" name="angle-right" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    )
  }
}
