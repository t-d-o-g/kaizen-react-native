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
import API from '../../utils/API'
import userInfo from '../../utils/userInfo'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  state = {
    username: undefined,
    password: undefined,
    loginFailedMsg: undefined,
  }

  loginUser = () => {
    const { username, password } = this.state
    const { navigation } = this.props
    // console.warn("In login user")
    // VIK_TODO: Do validation
    // VIK_TODO: Make changes so we use email instead of username
    API.loginUser({ username, password })
      .then(response => {
        /* eslint-disable no-console */
        if (response.status === 200) {
          userInfo
            .saveUserInfo(response.data)
            .then(() => {
              navigation.navigate('Home', { getLoginStatus: true })
            })
            .catch(error => {
              console.warn(JSON.stringify(error))
            })
        } else {
          // VIK_TODO: Give msg to user
        }
      })
      .catch(() => {
        // VIK_TODO: Give msg to user
        this.setState({
          loginFailedMsg: 'Login failed. Please try again',
        })
      })
  }

  render() {
    const { navigation } = this.props
    const { username, password, loginFailedMsg } = this.state

    return (
      <Container>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#282828' }}>
          <Left>
            <Icon
              name="md-home"
              style={{ color: 'white' }}
              onPress={() => navigation.navigate('Home')}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel style={{ alignSelf: 'center', marginTop: 50, width: '75%' }}>
              <Label> Username </Label>
              <Input
                style={styles.input}
                value={username}
                onChangeText={inputValue => this.setState({ username: inputValue })}
              />
            </Item>
            <Item floatingLabel style={{ alignSelf: 'center', width: '75%' }}>
              <Label> Password </Label>
              <Input
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={inputValue => this.setState({ password: inputValue })}
              />
            </Item>
          </Form>
          <Button primary style={styles.loginButton} onPress={this.loginUser}>
            <Text style={styles.loginText}> Login </Text>
          </Button>
          <Text style={styles.registerText}>
            {' '}
            Do not have an account?
            <Text style={styles.anchorText} onPress={() => navigation.navigate('Register')}>
              {' '}
              Register here.{' '}
            </Text>
          </Text>
          <Text style={styles.loginFailedText}>{loginFailedMsg}</Text>
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
    backgroundColor: '#484848',
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

  loginFailedText: {
    paddingTop: 25,
    textAlign: 'center',
    color: 'red',
  },

  anchorText: {
    color: 'blue',
  },
})
