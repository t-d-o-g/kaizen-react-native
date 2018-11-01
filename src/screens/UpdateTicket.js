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
  static navigationOptions = {
    title: 'Update Ticket',
  }

  state = {
    category: '',
    status: '',
    ticketText: '',
  }

  constructor(props) {
    super(props)
    this.setCategory = this.setCategory.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    ticketInfo.status === 'Open'
      ? this.setState({ status: 'key2' })
      : this.setState({ status: 'key3' })

    switch (ticketInfo.category) {
      case 'Parking':
        this.setState({ category: 'key2' })
        break
      case 'Noise':
        this.setState({ category: 'key3' })
        break
      default:
        this.setState({ category: 'key4' })
        break
    }

    this.setState({ ticketText: ticketInfo.description })
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

  handleUpdate = idInfo => {
    const { navigation } = this.props
    const { category, status, ticketText } = this.state

    const updatedTicket = {
      id: idInfo.ticketId,
      ticket: ticketText,
    }

    const updatedTicketRef = {
      id: idInfo.ticketXrefsId,
      TicketId: idInfo.ticketId,
      TicketLocationId: idInfo.ticketLocationId,
      CategoryId: category.substring(3),
      StatusId: status.substring(3),
      UserId: idInfo.userId,
    }

    API.updateTicket(updatedTicket)
      .then(response => {
        /* eslint-disable no-console */
        console.log(response)
        /* eslint-enable no-console */
      })
      .then(
        API.updateTicketXrefs(updatedTicketRef)
          .then(response => {
            /* eslint-disable no-console */
            console.log(response)
            /* eslint-enable no-console */
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

  handleTextChange(event) {
    this.setState({ ticketText: event.nativeEvent.text })
  }

  render() {
    const { navigation } = this.props
    const { category, status, ticketText } = this.state
    const ticketInfo = navigation.getParam('ticketInfo')
    const idInfo = navigation.getParam('idInfo')

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
            <Text style={styles.text}> Created By : </Text>
            <Input disabled style={styles.input} value={ticketInfo.createdBy} />

            <Text style={styles.text}> Select Category : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={category}
              onValueChange={this.setCategory}
            >
              <Picker.Item label="Parking" value="key2" />
              <Picker.Item label="Noise" value="key3" />
              <Picker.Item label="Traffic" value="key4" />
            </Picker>

            <Text style={styles.text}> What is the Issue? </Text>
            <Textarea
              bordered
              onChange={this.handleTextChange}
              rowSpan={5}
              style={styles.input}
              value={ticketText}
            />

            <Text style={styles.text}> Select Status : </Text>
            <Picker
              note
              mode="dropdown"
              style={styles.input}
              selectedValue={status}
              onValueChange={this.setStatus}
            >
              <Picker.Item label="Open" value="key2" />
              <Picker.Item
                label="Closed"
                value="key3
              "
              />
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
