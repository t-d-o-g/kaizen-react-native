/* eslint react/prefer-stateless-function: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class EventInfo extends React.Component {
  static propTypes = {
    eventInfo: PropTypes.string.isRequired,
  }

  render() {
    const { eventInfo } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Title: {eventInfo.title}</Text>
        <Text style={styles.description}>Description: {eventInfo.description}</Text>
        <Text style={styles.status}>Status: {eventInfo.status}</Text>
        {/* <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this.props.onClose}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.reviewButton}
                    onPress={this.props.onReview}
                    >
                        <Text style={styles.reviewButtonText}>review</Text>
                    </TouchableOpacity>
                </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0006',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // alignSelf: 'center',
    // padding: 0,
    // borderColor: '#ccc',
    // borderWidth: 1,
    // marginBottom: 5,
  },
  title: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 18,
  },
  description: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 12,
  },
  status: {
    textAlign: 'left',
    fontFamily: '',
    paddingTop: 5,
    fontSize: 18,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
  reviewButton: {
    backgroundColor: '#333',
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  reviewButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
})
