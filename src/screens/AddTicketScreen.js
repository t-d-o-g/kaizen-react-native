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
  Left,
  Picker,
  Right,
  Textarea,
} from 'native-base'

export default class AddTicket extends React.Component {
  static navigationOptions = {
    title: 'AddTicket',
  }

  constructor(props) {
    super(props)
    this.state = {
      category: 'key0',
      status: 'key0',
    }
  }

  setCategory(category) {
    this.setState({
      category,
    })
  }

  setStatus(status) {
    this.setState({
      status,
    })
  }

  render() {
    const { navigation } = this.props
    const { category, status } = this.state

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
            <Text style={styles.text}> Select Category : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={category}
              onValueChange={this.setCategory.bind(this)}
            >
              <Picker.Item label="None" value="key0" />
              <Picker.Item label="Parking" value="key1" />
              <Picker.Item label="Noise" value="key2" />
              <Picker.Item label="Traffic" value="key3" />
              <Picker.Item label="Other" value="key4" />
            </Picker>

            <Text style={styles.text}> What is the Issue? </Text>
            <Textarea style={styles.input} rowSpan={5} bordered />

            <Text style={styles.text}> Select Status : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={status}
              onValueChange={this.setStatus.bind(this)}
            >
              <Picker.Item label="None" value="key0" />
              <Picker.Item label="Open" value="key1" />
              <Picker.Item label="Closed" value="key2" />
            </Picker>

            <Text style={styles.text}> Location : </Text>
            <Item style={styles.input} regular>
              <Input />
            </Item>

            <Button success style={styles.submitButton}>
              <Text> Submit Ticket </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
  },

  submitButton: {
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 50,
    width: '80%',
  },

  text: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 30,
  },
})
