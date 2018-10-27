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
      category: category,
      description: t.String,
      status: status,
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

  handleUpdate = idInfo => {
    const value = this._form.getValue()
    console.log(value)
    console.log(idInfo.ticketLocationId)

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

    let updatedTicket = {
      id: idInfo.ticketId,
      ticket: value.description,
    }

    let updatedTicketXrefs = {
      id: idInfo.ticketXrefsId,
      TicketId: idInfo.ticketId,
      TicketLocationId: idInfo.ticketLocationId,
      CaegoryId: categoryId,
      StatusId: statusId,
      UserId: idInfo.userId,
    }

    API.updateTicket(updatedTicket)
      .then(res => {
        console.log(res)
      })
      .then(
        API.updateTicketXrefs(updatedTicketXrefs)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err)),
      )
      .catch(err => console.log(err))
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticketInfo')
    const idInfo = navigation.getParam('idInfo')

    return (
      <View style={styles.container}>
        <Form
          ref={c => (this._form = c)}
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
