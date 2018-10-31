import { AsyncStorage } from 'react-native'

export default {
  saveUserInfo: async userInfo => {
    try {
      return await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
      // Error saving data
      /* eslint-disable no-console */
      console.warn('Error saving user info:', error)
      /* eslint-enable no-console */
      return 'Error saving user info'
    }
  },

  getUserInfo: async () => {
    try {
      const item = await AsyncStorage.getItem('userInfo')
      return JSON.parse(item)
    } catch (error) {
      // Error retrieving  data
      /* eslint-disable no-console */
      console.warn(error)
      /* eslint-enable no-console */
      return 'Error retrieving user info'
    }
  },
}
