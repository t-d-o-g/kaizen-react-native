import React from 'react'
import { StatusBar, StyleSheet, Text } from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
} from 'native-base'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="home" onPress={() => navigation.navigate('Home')} />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label> Username </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel last>
              <Label> Password </Label>
              <Input style={styles.input} />
            </Item>
            <Button primary style={styles.loginButton}>
              <Text style={styles.loginText}> Login </Text>
            </Button>
          </Form>
          <Text style={styles.registerText}>
            {' '}
            Don't have an account?
            <Text style={styles.anchorText} onPress={() => navigation.navigate('Register')}>
              {' '}
              Register here.{' '}
            </Text>
          </Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },

  loginButton: {
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 50,
    width: '80%',
  },

  loginText: {
    color: 'white',
    textAlign: 'center',
  },

  registerText: {
    paddingTop: 25,
    textAlign: 'center',
  },

  anchorText: {
    color: 'blue',
  },
})
