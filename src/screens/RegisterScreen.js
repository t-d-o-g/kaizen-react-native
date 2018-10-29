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
    // console.warn("In registerUser")
    // VIK_TODO: Do form validation

    API.registerUser({ email: this.state.email, password: this.state.password })
      .then(response => {
        console.warn(JSON.stringify(response))
      })
      .catch(error => {
        console.warn(error)
      })
    // console.warn("submitted");
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
              <Label> First Name </Label>
              <Input
                style={styles.input}
                value={this.state.firstName}
                onChangeText={inputValue => this.setState({ firstName: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Last Name </Label>
              <Input
                style={styles.input}
                value={this.state.lastName}
                onChangeText={inputValue => this.setState({ lastName: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Email </Label>
              <Input
                style={styles.input}
                value={this.state.email}
                onChangeText={inputValue => this.setState({ email: inputValue })}
              />
            </Item>
            <Item floatingLabel>
              <Label> Username </Label>
              <Input
                style={styles.input}
                value={this.state.userName}
                onChangeText={inputValue => this.setState({ userName: inputValue })}
              />
            </Item>
            <Item floatingLabel last>
              <Label> Password </Label>
              <Input
                style={styles.input}
                secureTextEntry={true}
                value={this.state.password}
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
