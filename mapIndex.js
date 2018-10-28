import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import API from './utils/API'

export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Main',
  }

  constructor(props) {
    super(props)
    this.state = {
      ticketInfo: {},
      markers: [],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      },
      tickets: [],
      markerLocations: [
        {
          rotation: 78,
          latitude: 40.731734,
          longitude: -74.0605,
          identifier: 'test1',
          title: "it's noisy",
          description: 'noisy after 10pm here',
          status: 'open',
        },
        {
          rotation: -10,
          latitude: 40.730255,
          longitude: -74.0656,
          identifier: 'test2',
          title: "it's quiet",
          description: 'too quiet in this community',
          status: 'open',
        },
        {
          rotation: 262,
          latitude: 40.732206,
          longitude: -74.0669,
          identifier: 'test3',
          title: "it's rainy",
          description: 'too much rain during fall here',
          status: 'open',
        },
      ],
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

  _loadTickets() {
    API.getAllTickets()
      .then(res => {
        let tickets = []

        for (i = 0; i < res.data.length; i++) {
          let ticket = {}
          ticket.user = `${res.data[i].User.first_name}  ${res.data[i].User.last_name}`
          ticket.latitude = res.data[i].TicketLocation.location.coordinates[0]
          ticket.longitude = res.data[i].TicketLocation.location.coordinates[1]
          ticket.category = res.data[i].Category.category
          ticket.description = res.data[i].Ticket.ticket
          ticket.createdAt = res.data[i].Ticket.createdAt
          ticket.lastUpdatedAt = res.data[i].Ticket.updatedAt
          ticket.status = res.data[i].Status.status
          ticket.id = res.data[i].id
          ticket.ticketId = res.data[i].Ticket.id //informations needed to pass to update page
          ticket.userId = res.data[i].User.id
          ticket.ticketLocationId = res.data[i].TicketLocation.id

          tickets.push(ticket)
        }

        this.setState({
          tickets: tickets,
        })
      })
      .catch(err => console.log(err))
  }

  _onRegionChange(region) {
    // this.setState({ region: region });
    // console.log(this.state.region);
  }

  _onPress(e) {
    let locationInfo = {
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

    this.props.navigation.navigate('CreateTicket', {
      locationInfo: locationInfo,
    })
  }

  _onMarkerPress(e) {
    console.log(e.nativeEvent)
    var result = this.state.tickets.filter(obj => {
      return obj.id === parseInt(e.nativeEvent.id)
    })

    let ticketInfo = {
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

    this.setState({
      ticketInfo: {
        category: result[0].category,
        description: result[0].description,
        status: result[0].status,
        user: result[0].user,
        updated: result[0].lastUpdatedAt.toString(),
      },
    })

    this.props.navigation.navigate('TicketDetails', {
      ticketInfo: ticketInfo,
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        this.setState({
          region: region,
        })
      },
      error => console.log(error),
      { enableHighAccuracy: false, maximumAge: 1000 },
    )

    this._loadTickets()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          showsUserLocation={true}
          zoomEnabled={true}
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
          region={this.state.region}
          onRegionChange={this._onRegionChange.bind(this)}
          onPress={this._onPress}
        >
          {this.state.tickets.map((ticket, i) => (
            <MapView.Marker
              key={i}
              coordinate={ticket}
              onPress={this._onMarkerPress}
              identifier={ticket.id.toString()}
            />
          ))}
          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} coordinate={marker} />
          ))}
        </MapView>
      </View>
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
