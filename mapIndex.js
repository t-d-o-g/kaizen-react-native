import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import GeoCoder from 'react-native-geocoder'
import EventModal from './src/components/EventModal'
import EventCallout from './src/components/EventCallout'
import EventInfo from './src/components/EventInfo'
import { strikethrough } from 'ansi-colors'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventModalVisible: false,
      eventInfo: {
        title: 'Why always me?',
        description: 'I made a brilliant goal',
        status: 'open',
      },
      markers: [],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerLocations: [
        {
          rotation: 78,
          latitude: 37.78725,
          longitude: -122.4318,
        },
        {
          rotation: -10,
          latitude: 37.79015,
          longitude: -122.4318,
        },
        {
          rotation: 262,
          latitude: 37.78725,
          longitude: -122.4348,
        },
      ],
    }
    this._onPress = this._onPress.bind(this)
    this.initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    }
  }

  _onRegionChange(region) {
    this.setState({ region })
    console.log(this.state.region)
  }

  _onPress(e) {
    console.log(e.nativeEvent.coordinate)
    this.setState({
      markers: [
        //   ...this.state.markers,
        {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        },
      ],
    })
    console.log(this.state.markers)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          showsUserLocation={true}
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
          onRegionChange={this._onRegionChange.bind(this)}
          onPress={this._onPress}
        >
          {this.state.markerLocations.map((markerLocation, i) => (
            <MapView.Marker key={i} coordinate={markerLocation}>
              <MapView.Callout tooltip>
                <EventCallout
                  onClose={() => {
                    console.log("what's up?")
                  }}
                  onReview={() => {
                    console.log('linking to review page...')
                  }}
                >
                  <EventInfo eventInfo={this.state.eventInfo} />
                </EventCallout>
              </MapView.Callout>
            </MapView.Marker>
          ))}
          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} coordinate={marker} />
          ))}
        </MapView>
        <EventModal
          visible={this.state.eventModalVisible}
          onClose={() => {
            this.setState({
              eventModalVisible: false,
            })
          }}
          onReview={() => {
            this.setState({
              eventModalVisible: false,
            })
            console.log('linking to review page...')
          }}
          eventInfo={this.state.eventInfo}
        />
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
