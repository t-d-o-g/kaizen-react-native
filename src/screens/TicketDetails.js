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

  getStatus = (status) => {
    if (status === 'Open'){
      return 'ios-checkmark-circle'
    }
    return 'ios-close-circle'
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
                  style={{ alignSelf: 'center', borderWidth: 1 }}
                />
                <Body>
                  <Text> {ticketInfo.user} </Text>
                  <Text note> {ticketInfo.updated} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.category}>{ticketInfo.category}</Text>
                <Text>Description: {"\n"}</Text>
                <Text style={{fontSize: 18, paddingBottom: 15}}>{ticketInfo.description}</Text>
                {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/> */}
                <Text>Insert an Image Here (Optional)</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Icon 
                  name={this.getStatus(ticketInfo.status)}
                  style={{alignSelf: 'center'}}> 
                </Icon>
                <Text style={{alignSelf: 'center'}}>{ticketInfo.status}</Text> 
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  style={{alignSelf: 'center', justifyContent: 'center', width: 150}}
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
                  <Text style={{alignSelf: 'center', color: 'white'}}> Review </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  category: {
    alignSelf: 'center',
    fontSize: 24
  },
  status: {
    alignContent: 'center'
  },
  reviewButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '33%'
  }
})
