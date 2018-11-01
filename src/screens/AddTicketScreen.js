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
import API from '../../utils/API'
import userInfo from '../../utils/userInfo'

export default class AddTicket extends React.Component {
  static navigationOptions = {
    title: 'AddTicket',
  }

  state = {
    category: '',
    status: '',
    ticketText: 'Description',
    userID: '',
  }

  constructor(props) {
    super(props)
    this.setCategory = this.setCategory.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)

    // const { navigation } = this.props

    this.state = {
      category: 'key2',
      status: 'key2',
    }
  }

  componentDidMount() {
    userInfo
      .getUserInfo()
      .then(response => {
        if (response !== null) {
          /* eslint-disable no-console */
          console.log(response)
          /* eslint-enable no-console */
          this.setState({ userID: response.id })
        }
        return ''
      })
      .catch(err => {
        throw err
      })
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

  handleSubmit = location => {
    // let categoryID; let statusID; let userID
    let ticketLocationID
    let ticketID
    const { navigation } = this.props
    const { category, ticketText, status, userID } = this.state

    const ticketsLocation = {
      newLat: location.latitude,
      newLng: location.longitude,
    }

    API.saveTicket({ ticket: ticketText })
      .then(response => {
        ticketID = response.data.id
        /* eslint-disable no-console */
        console.log(ticketID)
        /* eslint-enable no-console */
      })
      .then(
        API.saveLocation(ticketsLocation)
          .then(response => {
            ticketLocationID = response.data.id
            /* eslint-disable no-console */
            console.log(ticketLocationID)
            /* eslint-enable no-console */
          })
          .then(() => {
            const TicketRef = {
              CategoryId: category.substring(3),
              StatusId: status.substring(3),
              TicketLocationId: ticketLocationID,
              TicketId: ticketID,
              UserId: userID,
            }
            /* eslint-disable no-console */
            console.log('TICKETREF', TicketRef)
            /* eslint-enable no-console */
            API.saveTicketXrefs(TicketRef)
              .then(response => {
                console.log(response)
                this.props.navigation.navigate('Home', { reloadTickets: true })
              })
              .catch(error => console.log(error))
          })
          .catch(error => {
            throw error
          }),
      )
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
    const location = navigation.getParam('locationInfo')

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
              <Picker.Item label="Closed" value="key3" />
            </Picker>

            <Text style={styles.text}> Location : </Text>
            <Item style={styles.input} regular>
              <Input
                disabled
                value={`${Math.round(location.latitude * 10000) / 10000}, ${Math.round(
                  location.longitude * 10000,
                ) / 10000}`}
              />
            </Item>

            <Button onPress={() => this.handleSubmit(location)} success style={styles.submitButton}>
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
