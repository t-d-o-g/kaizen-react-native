/* eslint react/destructuring-assignment: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './styles'

const AlertBox = props => (
  <View style={[styles[props.type], styles.box]}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
)

AlertBox.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
}

AlertBox.defaultProps = {
  type: undefined,
}

export default AlertBox
