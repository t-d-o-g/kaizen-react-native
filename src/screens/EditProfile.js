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

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="md-menu" onPress={() => navigation.openDrawer()} />
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
              <Label> Username </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel>
              <Label> Password </Label>
              <Input style={styles.input} />
            </Item>
            <Item floatingLabel last>
              <Label> Confirm Password</Label>
              <Input style={styles.input} />
            </Item>
            <Button primary style={styles.saveButton}>
              <Text style={styles.saveText}> Save </Text>
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

  saveButton: {
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 50,
    width: '80%',
  },

  saveText: {
    color: 'white',
    textAlign: 'center',
  },
})
