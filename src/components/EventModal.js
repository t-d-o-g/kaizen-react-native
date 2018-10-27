import React from 'react'
import { Modal, View, Text, Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native'

export default class EventModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Title: {this.props.eventInfo.title}</Text>
            <Text style={styles.description}>Description: {this.props.eventInfo.description}</Text>
            <Text style={styles.status}>Status: {this.props.eventInfo.status}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reviewButton} onPress={this.props.onReview}>
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