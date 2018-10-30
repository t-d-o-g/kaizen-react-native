/* eslint no-underscore-dangle: 0 */

import React from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { Body, Button, Container, Header, Icon, Left, Right } from 'native-base'
import MapView from 'react-native-maps'
import API from '../../utils/API'

// import EventModal from '../components/EventModal'
// import EventCallout from '../components/EventCallout'
// import EventInfo from '../components/EventInfo'

export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props)
    // this._onRegionChange = this._onRegionChange.bind(this)
    this.state = {
      // ticketInfo: {},
      markers: [],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      },
      tickets: [],
      // markerLocations: [
      //   {
      //     rotation: 78,
      //     latitude: 40.731734,
      //     longitude: -74.0605,
      //     identifier: 'test1',
      //     title: "it's noisy",
      //     description: 'noisy after 10pm here',
      //     status: 'open',
      //   },
      //   {
      //     rotation: -10,
      //     latitude: 40.730255,
      //     longitude: -74.0656,
      //     identifier: 'test2',
      //     title: "it's quiet",
      //     description: 'too quiet in this community',
      //     status: 'open',
      //   },
      //   {
      //     rotation: 262,
      //     latitude: 40.732206,
      //     longitude: -74.0669,
      //     identifier: 'test3',
      //     title: "it's rainy",
      //     description: 'too much rain during fall here',
      //     status: 'open',
      //   },
      // ],
    }
    this._onPress = this._onPress.bind(this)
    this._onMarkerPress = this._onMarkerPress.bind(this)
    this.initialRegion = {
      latitude: 40.73136,
      longitude: -74.0628,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    }
    this._loadTickets = this._loadTickets.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        /* eslint-disable no-console */
        console.log(position.coords)
        /* eslint-enable no-console */
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }
        this.setState({
          region,
        })
      },
      error => {
        throw error
      },
      { enableHighAccuracy: false, maximumAge: 1000 },
    )

    this._loadTickets()
  }

  _loadTickets() {
    API.getAllTickets()
      .then(res => {
        const tickets = []

        for (let i = 0; i < res.data.length; i++) {
          const ticket = {}
          const latitude = res.data[i].TicketLocation.location.coordinates[0]
          const longitude = res.data[i].TicketLocation.location.coordinates[1]
          ticket.user = `${res.data[i].User.first_name}  ${res.data[i].User.last_name}`
          ticket.latitude = latitude
          ticket.longitude = longitude
          ticket.category = res.data[i].Category.category
          ticket.description = res.data[i].Ticket.ticket
          ticket.createdAt = res.data[i].Ticket.createdAt
          ticket.lastUpdatedAt = res.data[i].Ticket.updatedAt
          ticket.status = res.data[i].Status.status
          ticket.id = res.data[i].id
          ticket.ticketId = res.data[i].Ticket.id // informations needed to pass to update page
          ticket.userId = res.data[i].User.id
          ticket.ticketLocationId = res.data[i].TicketLocation.id

          tickets.push(ticket)
        }

        this.setState({
          tickets,
        })
      })
      .catch(err => {
        throw err
      })
  }

  // _onRegionChange(region) {
  // this.setState({ region: region });
  // console.log(region);
  // }

  _onPress(e) {
    const { navigation } = this.props
    const locationInfo = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    }
    this.setState({
      markers: [
        //   ...this.state.markers,
        {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        },
      ],
    })

    navigation.navigate('AddTicket', {
      locationInfo,
    })
  }

  _onMarkerPress(e) {
    const { navigation } = this.props
    const { tickets } = this.state
    /* eslint-disable no-console */
    console.log(e.nativeEvent)
    /* eslint-enable no-console */
    const result = tickets.filter(obj => obj.id === parseInt(e.nativeEvent.id, 10))

    const ticketInfo = {
      category: result[0].category,
      description: result[0].description,
      status: result[0].status,
      user: result[0].user,
      updated: result[0].lastUpdatedAt.toString(),
      ticketXrefsId: result[0].id,
      ticketId: result[0].ticketId,
      userId: result[0].userId,
      ticketLocationId: result[0].ticketLocationId,
    }

    // this.setState({
    //   ticketInfo: {
    //     category: result[0].category,
    //     description: result[0].description,
    //     status: result[0].status,
    //     user: result[0].user,
    //     updated: result[0].lastUpdatedAt.toString(),
    //   },
    // })

    navigation.navigate('TicketDetails', {
      ticketInfo,
    })
  }

  render() {
    const { region, markers, tickets } = this.state
    const { navigation } = this.props

    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Left>
            <Icon name="md-menu" onPress={() => navigation.openDrawer()} />
          </Left>
          <Body />
          <Right>
            <Button onPress={() => navigation.navigate('Login')} transparent>
              <Text> Login </Text>
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <MapView
            showsUserLocation
            zoomEnabled
            style={styles.fullScreenMap}
            initialRegion={this.initialRegion}
            region={region}
            // onRegionChange={this._onRegionChange}
            onPress={this._onPress}
          >
            {tickets.map(ticket => (
              <MapView.Marker
                key={ticket.id}
                coordinate={ticket}
                onPress={this._onMarkerPress}
                identifier={ticket.id.toString()}
              />
            ))}
            {markers.map((marker, i) => (
              /* eslint-disable react/no-array-index-key */
              <MapView.Marker key={i} coordinate={marker} />
              /* eslint-enable react/no-array-index-key */
            ))}
          </MapView>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  fullScreenMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})
