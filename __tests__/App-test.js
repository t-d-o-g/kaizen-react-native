/* eslint-disable */

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import App from '../App'

/* Workaround for TypeError: Cannot read property 'setNativeProps' of null
   https://github.com/react-community/react-native-maps/issues/889 */
jest.mock('react-native-maps', () => {
  const React = require.requireActual('react')
  const MapView = require.requireActual('react-native-maps')

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children)
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children)
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children)
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes
  MockMarker.propTypes = MapView.Marker.propTypes
  MockMapView.propTypes = MapView.propTypes
  MockMapView.Marker = MockMarker
  MockMapView.Callout = MockCallout
  return MockMapView
})

jest.useFakeTimers()
beforeEach(() => {
  NavigationTestUtils.resetInternalState()
})

it('renders the loading screen', async () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<App skipLoadingScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
