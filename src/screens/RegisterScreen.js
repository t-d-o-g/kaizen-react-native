import React from 'react'
import { StatusBar, StyleSheet, Text } from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
} from 'native-base'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  }

  render() {
    const { navigation } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon
              ios="ios-arrow-back"
              android="md-arrow-back"
              onPress={() => navigation.navigate('Login')}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label> Full Name </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel>
              <Label> Email </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel>
              <Label> Username </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel last>
              <Label> Password </Label>
              <Input style={styles.input} />
            </Item>
            <Button primary style={styles.registerButton}>
              <Text style={styles.registerText}> Register </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },

  registerButton: {
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 50,
    width: '80%',
  },

  registerText: {
    color: 'white',
    textAlign: 'center',
  },
})
