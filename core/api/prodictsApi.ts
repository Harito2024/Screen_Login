import axios from "axios"
import { Platform } from "react-native"

//TODO conectar mediante envs vars, Anriod e IOS
const  STAGE = process.env.EXPO_PUBLIC_STAFE || 'dev'

export const API_URL = 
(STAGE === 'prod')
? process.env.EXPO_PUBLIC_API_URL
:(Platform.OS)==='ios'
? process.env.EXPO_PUBLIC_API_URL_IOS
: process.env.EXPO_PUBLIC_API_URL_ANDROID

console.log({STAGE, [Platform.OS]:API_URL})


const productsApi = axios.create({
    baseURL: 'localhost:3000/api'
})

//TODO intercepstores

export { productsApi }

