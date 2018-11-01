import React from 'react'
import { StatusBar, Text, FlatList } from 'react-native'
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

export default class ImprovementScreen extends React.Component {
  static navigationOptions = {
    title: 'Improvements',
  }

  constructor(props) {
    super(props)
    this.state = {
      userTickets: [],
    }
    this.onTicketPress = this.onTicketPress.bind(this)
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
        userTicket.ticket = 'Login to see your improvements.'
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
            userTicket.ticket = 'You do not have any improvements yet.'
            userTickets.push(userTicket)
          } else {
            for (let i = 0; i < response.data.length; i++) {
              userTickets.push(response.data[i].Ticket)
            }
          }
        }

        console.log('userTickets', userTickets)
        this.setState({
          userTickets,
        })
      })
      .catch(err => {
        throw err
      })
  }

  onTicketPress(e) {
    const { navigation } = this.props
    const { userTickets } = this.state
    // const result = userTickets.filter(obj => obj.id === parseInt(e.nativeEvent.id, 10))
    const result = userTickets

    /* eslint-disable no-console */
    console.log('e', e.nativeEvent)
    console.log('RESULT:', result[0])
    /* eslint-enable no-console */

    /*
    const ticketInfo = {
      // category: result[0].category,
      description: result[0].ticket,
      // status: result[0].status,
      // user: result[0].user,
      updated: result[0].updatedAt.toString(),
      // ticketXrefsId: result[0].id,
      ticketId: result[0].id,
      // userId: result[0].userId,
      // ticketLocationId: result[0].ticketLocationId,
    }

    navigation.navigate('TicketDetails', {
      ticketInfo,
    })
    */
  }

  render() {
    const { userTickets } = this.state
    const { navigation } = this.props

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
            <ListItem key={userTicket.ticket} onPress={this.onTicketPress}>
              <Left>
                <Text>{userTicket.ticket}</Text>
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
