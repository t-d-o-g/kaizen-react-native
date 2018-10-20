import React from 'react'
import { StatusBar, Text } from 'react-native'
import { Body, Container, Content, Header, Icon, Left, Right } from 'native-base'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon
              name="ios-menu" /* onPress={() => this.props.navigation.navigate('DrawerOpen')} */
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text> Home Screen </Text>
        </Content>
      </Container>
    )
  }
}
