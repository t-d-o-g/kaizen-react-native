import { AsyncStorage } from 'react-native'

export default {
  saveUserInfo: async userInfo => {
    try {
      return await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
      // Error saving data
      console.warn('Error saving user info:', error)
      return "Error saving user info"
    }
  },

  getUserInfo: async () => {
    try {
      const item = await AsyncStorage.getItem('userInfo')
      return JSON.parse(item)
    } catch (error) {
      // Error retrieving  data
      console.warn(error)
      return "Error retrieving user info"
    }
  },
}
