import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import EventModal from './src/components/EventModal'
import EventCallout from './src/components/EventCallout'
import EventInfo from './src/components/EventInfo'

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
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      },
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
  }

  _onRegionChange(region) {
    // this.setState({ region: region });
    console.log(this.state.region)
  }

  _onPress(e) {
    // console.log(e.nativeEvent.coordinate);
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

  _onMarkerPress(e) {
    console.log(e.nativeEvent)
    var result = this.state.markerLocations.filter(obj => {
      return obj.identifier === e.nativeEvent.id
    })

    console.log(result)
    // this.setState({
    //     region
    // });
    this.setState({
      eventInfo: {
        title: result[0].title,
        description: result[0].description,
        status: result[0].status,
      },
    })
    this.setState({
      eventModalVisible: true,
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
          {this.state.markerLocations.map((markerLocation, i) => (
            <MapView.Marker
              key={i}
              coordinate={markerLocation}
              onPress={this._onMarkerPress}
              identifier={markerLocation.identifier}
            >
              {/* <MapView.Callout 
                    tooltip
                    >
                        <EventCallout
                          onClose={() => {
                              console.log("what's up?");
                          }}
                          onReview={() => {
                            console.log("linking to review page...");
                          }}
                        >
                            <EventInfo
                              eventInfo={this.state.eventInfo}
                            />
                        </EventCallout>
                    </MapView.Callout> */}
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
