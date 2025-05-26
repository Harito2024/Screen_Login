import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'


export class SecureStorageAdapter{
    static async setItem(key:string, value:string){
        try {
            await SecureStore.setItemAsync(key, value)
        } catch (error) {
            Alert.alert('Error', 'Failed to save data')
        }
    }

    static async getItem(key:string){
        try {
            await SecureStore.getItemAsync(key)
        } catch (error) {
            Alert.alert('Error', 'Failed to get data')
            return null
        }
    }

    static async deleteItem (key:string){
        try {
            await SecureStore.deleteItemAsync(key)
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Failed to delete data')
        }
    }
}








/* # EXPO_PUBLIC_STAGE=dev

# EXPO_PUBLIC_API_URL=http://172.21.144.1:3000/api
#EXPO_PUBLIC_API_URL_IOS=http://localhost:3000/api
#EXPO_PUBLIC_API_URL_ANDROID=http://172.21.144.1:3000/api  
  
 */