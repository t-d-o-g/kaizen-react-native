import React from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Image,
  Left,
  Right,
  Thumbnail,
} from 'native-base'

const kaizenImg = require('../../assets/images/kaizen.png')

export default class TicketDetails extends React.Component {
  static navigationOptions = {
    title: 'Ticket Details',
  }

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon
              ios="ios-arrow-back"
              android="md-arrow-back"
              onPress={() => navigation.navigate('Home')}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail
                  large
                  source={kaizenImg}
                  square
                  // source={{ kaizenImg }}
                  style={{ alignSelf: 'center' }}
                />
                <Body>
                  <Text> Name Here </Text>
                  <Text note> April 15, 2016 </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Category</Text>
                {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/> */}
                <Text>Insert an Image Here (Optional)</Text>
                <Text>Description:</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  {/* Create an Icon for Open and Closed */}
                  <Icon name="logo-github" />
                  <Text> Open / Closed </Text>
                </Button>
                <Button primary textStyle={{ color: '#87838B' }}>
                  {/* Review Button Here */}
                  <Text> Review </Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Text style={styles.title}>Title: {ticketInfo.category}</Text>
          <Text style={styles.title}>Description: {ticketInfo.description}</Text>
          <Text style={styles.status}>Status: {ticketInfo.status}</Text>
          <Text style={styles.status}>Created By: {ticketInfo.user}</Text>
          <Text style={styles.status}>Last updated at: {ticketInfo.updated}</Text>

          <View style={styles.buttonContainer}>
            <Button
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
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 18,
  },
  description: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 12,
  },
  status: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 18,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
