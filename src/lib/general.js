import React from 'react'
import { Text, TouchableHighlight, Picker } from 'react-native'
import styles from './styles'

function renderItem({ item }) {
  return (
    <TouchableHighlight
      underlayColor="#ccc"
      onPress={() => {
        // console.log('pressed!');
      }}
      style={styles.list_item}
    >
      <Text key={item.key}>{item.name}</Text>
    </TouchableHighlight>
  )
}

function getLocalDateTime(date) {
  let hours = date.getHours()
  if (hours < 10) hours = `0${hours}`

  let minutes = date.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`

  const month = date.getMonth() + 1
  return `${month}/${date.getDate()}/${date.getFullYear()}, ${hours}:${minutes}`
}

function getShortMonth(monthNumber) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return months[monthNumber]
}

function renderPickerItems(data) {
  return data.map(item => {
    // const val = item.name.toLowerCase();
    const id = item.key ? item.key : item.id
    return <Picker.Item key={id} label={item.name} value={id} />
  })
}

function uniqid() {
  return Math.random()
    .toString(36)
    .substr(2, 9)
}

function getDate() {
  const datetime = getLocalDateTime(new Date())
  const date = datetime.substr(0, datetime.lastIndexOf(','))
  return date
}

function getPathSafeDatetime() {
  const datetime = getLocalDateTime(new Date())
    .replace(/\//g, '-')
    .replace(',', '')
    .replace(/:/g, '_')
    .replace(/ /g, '+')
  return datetime
}

function lastWeeksDates() {
  const dates = []
  for (let i = 0; i < 7; i += 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const datetime = getLocalDateTime(d)
    const formattedDate = datetime.substr(0, datetime.lastIndexOf(','))
    dates.push(formattedDate)
  }

  return dates
}

function friendlyDate(str) {
  const friendlyDateVar = str
    .replace(/-/g, '/')
    .replace(/\+/g, ' ')
    .replace(/_/g, ':')
  return friendlyDateVar
}

export {
  renderItem,
  renderPickerItems,
  uniqid,
  getDate,
  lastWeeksDates,
  getPathSafeDatetime,
  friendlyDate,
  getShortMonth,
}
