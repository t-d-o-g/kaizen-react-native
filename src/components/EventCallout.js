/* eslint react/prefer-stateless-function: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class EventCallout extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
    style: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  }

  render() {
    const { onClose, onReview, style, children } = this.props
    /* eslint-disable no-console */
    console.log(onClose)
    /* eslint-enable no-console */
    return (
      <View style={[styles.container, style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {children}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reviewButton} onPress={onReview}>
                <Text style={styles.reviewButtonText}>review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
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
