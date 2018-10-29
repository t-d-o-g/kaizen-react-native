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
  }

  loginUser = () => {
    // console.warn("In login user")
    // VIK_TODO: Do validation
    // VIK_TODO: Make changes so we use email instead of username
    API.loginUser({ email: this.state.username, password: this.state.password })
      .then(response => {
        console.warn(JSON.stringify(response))
      })
      .catch(error => {
        console.warn(error)
      })
    // console.warn("submitted");
  }

  // saveAsyncStorage = () => {
  //   userInfo.saveUserInfo('This is test user save')
  //   .then(response => {
  //     console.warn( JSON.stringify(response))
  //   })
  //   .catch(error => {
  //     console.warn( JSON.stringify(error))
  //   })
  // }

  // retrieveAsyncStorage = () => {
  //   userInfo.getUserInfo()
  //   .then(response => {
  //     console.warn( JSON.stringify(response))
  //   })
  //   .catch(error => {
  //     console.warn( JSON.stringify(error))
  //   })
  // }

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
              <Input
                style={styles.input}
                value={this.state.username}
                onChangeText={inputValue => this.setState({ username: inputValue })}
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
          <Button primary style={styles.loginButton} onPress={this.loginUser}>
            <Text style={styles.loginText}> Login </Text>
          </Button>
          {/* VIK_DEBUG: Remove following later on */}
          {/* <Button primary style={styles.loginButton} onPress={this.saveAsyncStorage}>
              <Text style={styles.loginText}> Save in AsyncStorage </Text>
            </Button>
            <Button primary style={styles.loginButton} onPress={this.retrieveAsyncStorage}>
              <Text style={styles.loginText}> Retrieve from AsyncStorage </Text>
            </Button> */}
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
