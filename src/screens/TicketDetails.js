import React from 'react'
import { Text, StatusBar, StyleSheet, Image } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Thumbnail,
} from 'native-base'
import userInfo from '../../utils/userInfo'

const person = require('../../assets/images/person.jpg')
const mockTraffic = require('../../assets/images/traffic.jpg')

export default class TicketDetails extends React.Component {
  state = {
    userID: '',
  }

  static navigationOptions = {
    title: 'Ticket Details',
  }

  componentDidMount() {
    userInfo
      .getUserInfo()
      .then(response => {
        if (response !== null) {
          this.setState({ userID: response.id })
        }
        return ''
      })
      .catch(err => {
        throw err
      })
  }

  getStatus = status => {
    if (status === 'Open') {
      return 'ios-checkmark-circle'
    }
    return 'ios-close-circle'
  }

  getStatusName = status => {
    console.log(status)
    if (status === 'Close' || status === 'Closed') {
      return 'Closed'
    }
    return 'Open'
  }

  getStatusColor = status => {
    if (status === 'Open') {
      return 'green'
    }
    return 'red'
  }

  getDateFormat = date => {
    const time = this.getTimeFormat(date.substring(11, 16))
    return date.substring(5, 10) + '-' + date.substring(0, 4) + ' ' + time
  }

  getTimeFormat = time => {
    const hour = parseInt(time.substring(0, 2))
    if (hour === 0) {
      return '12' + time.substring(2) + ' AM'
    } else if (hour < 10) {
      return time.substring(1) + ' AM'
    } else if (hour >= 10 && hour < 12) {
      return time + ' AM'
    } else if (hour === 12) {
      return time + ' PM'
    } else {
      return hour - 12 + time.substring(2) + ' PM'
    }
  }

  showReviewButton = () => {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    if (this.state.userID === ticketInfo.userId) {
      return (
        <CardItem>
          <Body>
            <Button
              style={{
                alignSelf: 'center',
                backgroundColor: '#484848',
                justifyContent: 'center',
                width: 150,
              }}
              title="Review"
              onPress={() =>
                navigation.navigate('UpdateTicket', {
                  ticketInfo: {
                    category: ticketInfo.category,
                    description: ticketInfo.description,
                    status: ticketInfo.status,
                    createdBy: ticketInfo.user,
                  },
                  idInfo: {
                    ticketId: ticketInfo.ticketId,
                    ticketXrefsId: ticketInfo.ticketXrefsId,
                    userId: ticketInfo.userId,
                    ticketLocationId: ticketInfo.ticketLocationId,
                  },
                })
              }
            >
              <Text style={{ alignSelf: 'center', color: 'white' }}> Review </Text>
            </Button>
          </Body>
        </CardItem>
      )
    }
  }

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    return (
      <Container>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#282828' }}>
          <Left>
            <Icon
              ios="ios-arrow-back"
              android="md-arrow-back"
              style={{ color: 'white' }}
              onPress={() => navigation.navigate('Home')}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ backgroundColor: '#606060' }}>
              <Left>
                <Thumbnail
                  large
                  source={person}
                  circle
                  style={{ alignSelf: 'center', borderWidth: 1 }}
                />
                <Body>
                  <Text style={{ color: 'white' }}> {ticketInfo.user} </Text>
                  <Text note style={{ color: 'white' }}>
                    {' '}
                    {this.getDateFormat(ticketInfo.updated)}{' '}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Icon
                  name={this.getStatus(ticketInfo.status)}
                  style={{ alignSelf: 'center', color: this.getStatusColor(ticketInfo.status) }}
                />
                <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                  {this.getStatusName(ticketInfo.status)}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.category}>{ticketInfo.category}</Text>
                <Text style={{ borderBottomWidth: 0.5, width: '100%' }}>Description: {'\n'}</Text>
                <Text style={{ fontSize: 18, paddingBottom: 15, paddingTop: 10 }}>
                  {ticketInfo.description}
                </Text>
                <Image source={mockTraffic} style={{ alignSelf: 'center', maxWidth: 300 }} />
              </Body>
            </CardItem>
            {this.showReviewButton()}
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  category: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    alignContent: 'center',
  },
  reviewButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '33%',
  },
})
