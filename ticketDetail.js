import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default class TicketDetails extends React.Component {
  static navigationOptions = {
    title: 'Ticket Details',
  }

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Title: {ticketInfo.category}</Text>
        <Text style={styles.title}>Description: {ticketInfo.description}</Text>
        <Text style={styles.status}>Status: {ticketInfo.status}</Text>
        <Text style={styles.status}>Created By: {ticketInfo.user}</Text>
        <Text style={styles.status}>Last updated at: {ticketInfo.updated}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Home" onPress={() => this.props.navigation.navigate('Home')} />
          <Text> </Text>
          <Button
            title="Review"
            onPress={() =>
              this.props.navigation.navigate('UpdateTicket', {
                ticketInfo: {
                  category: ticketInfo.category,
                  description: ticketInfo.description,
                  status: ticketInfo.status,
                  createdBy: ticketInfo.user,
                },
                idInfo: {
                  ticketId: ticketInfo.ticketId,
                  ticketXrefsId: ticketInfo.ticketXrefsId,
                  userId: ticketInfo.userId,
                  ticketLocationId: ticketInfo.ticketLocationId,
                },
              })
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
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
})
