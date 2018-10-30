import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, TouchableOpacity, ViewPropTypes } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styles from './styles'

const IconButton = props => {
  const { icon, color, size, isTransparent, onPress } = props

  const iconName = icon || 'add'
  const iconColor = color || '#eee'
  const iconSize = size || 35

  IconButton.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    styles: ViewPropTypes.style,
    isTransparent: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  }

  IconButton.defaultProps = {
    icon: undefined,
    color: undefined,
    size: undefined,
    styles: undefined,
    isTransparent: undefined,
  }

  if (isTransparent) {
    return (
      <TouchableOpacity
        style={[styles.transparent_icon_button, props.styles]}
        onPress={props.onPress}
      >
        <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableHighlight style={styles.icon_button} underlayColor="#ccc" onPress={onPress}>
      <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
    </TouchableHighlight>
  )
}

export default IconButton
