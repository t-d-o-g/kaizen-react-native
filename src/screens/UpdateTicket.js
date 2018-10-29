/* eslint no-underscore-dangle: 0 */

import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import t from 'tcomb-form-native'
import API from '../../utils/API'

const { Form } = t.form

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

export default class UpdateTicket extends Component {
  static navigationOptions = {
    title: 'Update the Ticket...',
  }

  constructor(props) {
    super(props)

    this.state = {
      value: {
        category: '',
        description: '',
        status: '',
        createdBy: '',
      },
    }

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
      category,
      description: t.String,
      status,
      createdBy: t.String,
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
          multiline: true,
          numberOfLines: 4,
          error: 'error',
        },
        status: {
          error: 'Please confirm the Status',
        },
      },
      stylesheet: formStyles,
    }
  }

  componentDidMount() {}

  handleUpdate = idInfo => {
    const value = this._form.getValue()
    /* eslint-disable no-console */
    console.log(value)
    console.log(idInfo.ticketLocationId)
    /* eslint-enable no-console */

    let categoryId
    let statusId
    let ticketLocationId
    let ticketId
    let userId

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

    const updatedTicket = {
      id: idInfo.ticketId,
      ticket: value.description,
    }

    const updatedTicketXrefs = {
      id: idInfo.ticketXrefsId,
      TicketId: idInfo.ticketId,
      TicketLocationId: idInfo.ticketLocationId,
      CaegoryId: categoryId,
      StatusId: statusId,
      UserId: idInfo.userId,
    }

    API.updateTicket(updatedTicket)
      .then(res => {
        /* eslint-disable no-console */
        console.log(res)
        /* eslint-enable no-console */
      })
      .then(
        API.updateTicketXrefs(updatedTicketXrefs)
          .then(res => {
            /* eslint-disable no-console */
            console.log(res)
            /* eslint-enable no-console */
          })
          .catch(err => {
            throw err
          }),
      )
      .catch(err => {
        throw err
      })
  }

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')
    const idInfo = navigation.getParam('idInfo')

    return (
      <View style={styles.container}>
        <Form
          ref={c => {
            this._form = c
            return this._form
          }}
          type={this.Ticket}
          value={ticketInfo}
          options={this.options}
        />
        <Button
          title="Update"
          onPress={() => {
            this.handleUpdate(idInfo)
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
