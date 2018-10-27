/* eslint-disable */
import React from 'react'
import { TouchableHighlight, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styles from './styles'

const IconButton = props => {
  const IconName = props.icon ? props.icon : 'add'
  const color = props.color ? props.color : '#eee'
  const IconSize = props.size ? props.size : 35

  if (props.is_transparent) {
    return (
      <TouchableOpacity
        style={[styles.transparent_icon_button, props.styles]}
        onPress={props.onPress}
      >
        <MaterialIcons name={IconName} size={IconSize} color={color} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableHighlight style={styles.icon_button} underlayColor="#ccc" onPress={props.onPress}>
      <MaterialIcons name={IconName} size={IconSize} color={color} />
    </TouchableHighlight>
  )
}

export default IconButton
