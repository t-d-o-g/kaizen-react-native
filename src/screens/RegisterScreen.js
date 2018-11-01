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
import API from '../../utils/API'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  }

  state = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    userName: undefined,
    password: undefined,
  }

  registerUser = () => {
    const { firstName, lastName, email, userName, password } = this.state
    // console.warn("In registerUser")
    // VIK_TODO: Do form validation
    const user = {
      firstName,
      lastName,
      email,
      username: userName,
      password,
    }

    API.registerUser(user)
      .then(response => {
        /* eslint-disable no-console */
        console.warn(JSON.stringify(response))
      })
      .catch(error => {
        console.warn(error)
        /* eslint-enable no-console */
      })
    // console.warn("submitted");
  }

  render() {
    const { navigation } = this.props
    const { firstName, lastName, email, userName, password } = this.state

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon
              ios="ios-arrow-back"
              android="md-arrow-back"
              style={{ color: 'white' }}
              onPress={() => navigation.navigate('Login')}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label> First Name </Label>
              <Input
                style={styles.input}
                value={firstName}
                onChangeText={inputValue => this.setState({ firstName: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Last Name </Label>
              <Input
                style={styles.input}
                value={lastName}
                onChangeText={inputValue => this.setState({ lastName: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Email </Label>
              <Input
                style={styles.input}
                value={email}
                onChangeText={inputValue => this.setState({ email: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Username </Label>
              <Input
                style={styles.input}
                value={userName}
                onChangeText={inputValue => this.setState({ userName: inputValue })}
              />
            </Item>
            <Item floatingLabel last>
              <Label> Password </Label>
              <Input
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={inputValue => this.setState({ password: inputValue })}
              />
            </Item>
          </Form>
          <Button primary style={styles.registerButton} onPress={this.registerUser}>
            <Text style={styles.registerText}> Register </Text>
          </Button>
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
