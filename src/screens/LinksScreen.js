import React from 'react'
import { StatusBar, Text } from 'react-native'
import { Body, Container, Content, Header, Icon, Left, Right } from 'native-base'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} />
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
          <Text> Links Screen </Text>
        </Content>
      </Container>
    )
  }
}
