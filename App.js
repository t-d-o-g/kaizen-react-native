/* eslint no-underscore-dangle: 0 */

import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import PropTypes from 'prop-types'
import AppNavigator from './src/navigation/AppNavigator'
const robotDev = require('./assets/images/robot-dev.png')
const robotProd = require('./assets/images/robot-prod.png')
const spaceMonoRegular = require('./assets/fonts/SpaceMono-Regular.ttf')

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  }

  _loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([robotDev, robotProd]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': spaceMonoRegular,
      }),
    ])

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // eslint-disable-next-line no-console
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  render() {
    App.defaultProps = {
      skipLoadingScreen: undefined,
    }
    const { isLoadingComplete } = this.state
    const { skipLoadingScreen } = this.props
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
