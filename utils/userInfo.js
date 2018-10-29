import { AsyncStorage } from 'react-native'

export default {
  saveUserInfo: async userInfo => {
    try {
      await AsyncStorage.setItem('userInfo', userInfo)
    } catch (error) {
      // Error saving data
      console.log('Error saving user info:', error)
    }
  },

  getUserInfo: async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if (value !== null) {
        console.log('Got storage data:', value)
      }
    } catch (error) {
      // Error retrieving  data
      console.log(error)
    }
  },
}
