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
    const tickets = userInfo
      .getUserInfo()
      .then(response => {
        return API.getTicketsByUserId(response.id)
      })
      .catch(err => {
        throw err
      })

    tickets
      .then(response => {
        const userTickets = []

        for (let i = 0; i < response.data.length; i++) {
          let userTicket = {}

          userTicket = response.data[i].Ticket.ticket
          userTickets.push(userTicket)
          console.log(JSON.stringify(response.data[i].Ticket.ticket))
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
        <Header>
          <Left>
            <Icon name="md-menu" onPress={() => navigation.openDrawer()} />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Separator>
            <Text>My Open Improvements</Text>
          </Separator>
          {userTickets.map(userTicket => (
            <ListItem>
              <Left>
                <Text>{userTicket}</Text>
              </Left>
              <Right>
                <Icon type="FontAwesome" name="angle-right" />
              </Right>
            </ListItem>
          ))}
          <Separator>
            <Text>Improvements I like</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Caroline Aaron</Text>
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
