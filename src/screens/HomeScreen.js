import React from 'react'
import { Image, StatusBar, Text } from 'react-native'
import { Body, Button, Container, Content, Header, Icon, Left, Right } from 'native-base'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    const { navigation } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
          </Left>
          <Body />
          <Right>
            <Button onPress={() => navigation.navigate('Login')} transparent>
              <Text> Login </Text>
            </Button>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            // Will be changed in the future to the actual maps.
            source={require('../../assets/images/Google_Maps_screenshot.png')}
            style={{ height: '100%', width: '100%' }}
          />
        </Content>
      </Container>
    )
  }
}
