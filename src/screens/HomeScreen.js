import React from 'react'
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Body, Button, Container, Content, Fab, Header, Icon, Left, Right } from 'native-base'

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
          <ImageBackground
            // Will be changed in the future to the actual maps.
            source={require('../../assets/images/Google_Maps_screenshot.png')}
            style={styles.testImage}
          >
            <View style={{ flex: 1 }}>
              <Fab
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => navigation.navigate('AddTicket')}
              >
                <Text> + </Text>
              </Fab>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  testAddTicketButton: {
    alignSelf: 'flex-end',
    borderRadius: 50,
    margin: 50,
    padding: 20,
  },

  testImage: {
    height: '100%',
    width: '100%',
  },
})
