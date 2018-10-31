/* eslint no-underscore-dangle: 0 */

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
  Left,
  Picker,
  Right,
  Textarea,
} from 'native-base'
import API from '../../utils/API'


export default class UpdateTicket extends React.Component {
  state = {
    category: '',
    status: '',
    ticketText: '',
  }

  static navigationOptions = {
    title: 'Update Ticket',
  }

  constructor(props) {
    super(props)
    this.setCategory = this.setCategory.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
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

  handleTextChange(event) {
    this.setState({ ticketText: event.nativeEvent.text })
  }

  componentDidMount() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    ticketInfo.status === 'Open' ? this.setState({status: 'key0'}) : this.setState({status: 'key1'})

    switch(ticketInfo.category) {
      case 'Parking':
        this.setState({category: 'key0'})
        break
      case 'Noise':
        this.setState({category: 'key1'})
        break
      case 'Traffic':
        this.setState({category: 'key2'})
        break
      default:
        this.setState({category: 'key3'})
        break
    }

    this.setState({ticketText: ticketInfo.description})
  }

  handleUpdate = idInfo => {
    const { navigation } = this.props

    const updatedTicket = {
      id: idInfo.ticketId,
      ticket: this.state.ticketText
    }

    const updatedTicketRef = {
      id: idInfo.ticketXrefsId,
      TicketId: idInfo.ticketId,
      TicketLocationId: idInfo.ticketLocationId,
      CategoryId: this.state.category.substring(3),
      StatusId: this.state.status.substring(3),
      UserId: idInfo.userId
    }

    API.updateTicket(updatedTicket)
      .then(response => {
        console.log(response)
      })
      .then(
        API.updateTicketXrefs(updatedTicketRef)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            throw error
          }),
      )
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        throw error
      })
  }

  render() {
    const { navigation } = this.props
    const { category, status } = this.state
    const ticketInfo = navigation.getParam('ticketInfo')
    const idInfo = navigation.getParam('idInfo')

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="md-home" onPress={() => navigation.navigate('Home')} />
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <Form>
            <Text style={styles.text}> Created By : </Text>
            <Input
              disabled
              style={styles.input}
              value={ticketInfo.createdBy}
            />

            <Text style={styles.text}> Select Category : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={category}
              onValueChange={this.setCategory}
            >
              <Picker.Item label="Noise" value="key1" />
              <Picker.Item label="Traffic" value="key2" />
              <Picker.Item label="Other" value="key3" />
            </Picker>

            <Text style={styles.text}> What is the Issue? </Text>
            <Textarea
              bordered
              onChange={this.handleTextChange}
              rowSpan={5}
              style={styles.input}
              value={this.state.ticketText}
            />

            <Text style={styles.text}> Select Status : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={status}
              onValueChange={this.setStatus}
            >
              <Picker.Item label="Open" value="key0" />
              <Picker.Item label="Closed" value="key1" />
            </Picker>
            <Button
              info
              onPress={() => {
                this.handleUpdate(idInfo)
              }}
              style={styles.updateButton}
            >
              <Text> Update Ticket </Text>
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
    borderWidth: 0,
    width: '80%',
  },

  updateButton: {
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

