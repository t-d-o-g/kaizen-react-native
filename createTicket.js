import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import API from './utils/API'

import t from 'tcomb-form-native'

const Form = t.form.Form

// const category = t.enums({
//     None: 'None',
//     Parking: 'Parking',
//     Noise: 'Noise',
//     Traffic: 'Traffic'
//   });

// const status = t.enums({
//     None: 'None',
//     Open: 'Open',
//     Close: 'Close',
// });

// const Ticket = t.struct({
//   category: category,
//   description: t.String,
//   status: status,
// });

// const formStyles = {
//     ...Form.stylesheet,
//     formGroup: {
//       normal: {
//         marginBottom: 10
//       },
//     },
//     controlLabel: {
//       normal: {
//         color: 'blue',
//         fontSize: 18,
//         marginBottom: 7,
//         fontWeight: '600'
//       },
//       // the style applied when a validation error occours
//       error: {
//         color: 'red',
//         fontSize: 18,
//         marginBottom: 7,
//         fontWeight: '600'
//       }
//     }
//   }

//   const options = {
//     fields: {
//       category: {
//         error: 'Please choose Catetory'
//       },
//       description: {
//         error: 'error'
//       },
//       status: {
//         error: 'Please confirm the Status'
//       },
//     },
//     stylesheet: formStyles,
//   };

export default class CreatTicket extends Component {
  static navigationOptions = {
    title: 'Create a Ticket...',
  }

  constructor(props) {
    super(props)

    const category = t.enums({
      None: 'None',
      Parking: 'Parking',
      Noise: 'Noise',
      Traffic: 'Traffic',
    })

    const status = t.enums({
      None: 'None',
      Open: 'Open',
      Close: 'Close',
    })

    this.Ticket = t.struct({
      category: category,
      description: t.String,
      status: status,
    })

    const formStyles = {
      ...Form.stylesheet,
      formGroup: {
        normal: {
          marginBottom: 10,
        },
      },
      controlLabel: {
        normal: {
          color: 'blue',
          fontSize: 18,
          marginBottom: 7,
          fontWeight: '600',
        },
        // the style applied when a validation error occours
        error: {
          color: 'red',
          fontSize: 18,
          marginBottom: 7,
          fontWeight: '600',
        },
      },
    }

    this.options = {
      fields: {
        category: {
          error: 'Please choose Catetory',
        },
        description: {
          error: 'error',
        },
        status: {
          error: 'Please confirm the Status',
        },
      },
      stylesheet: formStyles,
    }
  }

  handleSubmit = location => {
    const value = this._form.getValue()

    let categoryId, statusId, ticketLocationId, ticketId, userId

    if (value.category === 'None') {
      categoryId = 1
    } else if (value.category === 'Parking') {
      categoryId = 2
    } else if (value.category === 'Noise') {
      categoryId = 3
    } else if (value.category === 'Traffic') {
      categoryId = 4
    }

    if (value.status === 'None') {
      statusId = 1
    } else if (value.status === 'Open') {
      statusId = 2
    } else if (value.status === 'Close') {
      statusId = 3
    }

    const newLocation = {
      newLat: location.latitude,
      newLng: location.longitude,
    }

    API.saveTicket({ ticket: value.description })
      .then(res => {
        ticketId = res.data.id
      })
      .then(
        API.saveLocation(newLocation)
          .then(res => {
            ticketLocationId = res.data.id
          })
          .catch(err => console.log(err)),
      )
      .then(() => {
        let newTicketXref = {
          CategoryId: categoryId,
          StatusId: statusId,
          TicketLocationId: ticketLocationId,
          TicketId: ticketId,
          UserId: 12,
        }
        API.saveTicketXrefs(newTicketXref).then(res => console.log(res))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { navigation } = this.props
    const location = navigation.getParam('locationInfo')

    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={this.Ticket} options={this.options} />
        <Button
          title="Submit"
          onPress={() => {
            this.handleSubmit(location)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
})
