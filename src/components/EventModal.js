/* eslint react/prefer-stateless-function: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

export default class EventModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    eventInfo: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
  }

  render() {
    const { visible, eventInfo, onClose, onReview } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Title: {eventInfo.title}</Text>
            <Text style={styles.description}>Description: {eventInfo.description}</Text>
            <Text style={styles.status}>Status: {eventInfo.status}</Text>
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
      </Modal>
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
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
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
