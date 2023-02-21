import axios from 'axios'
import { Platform } from 'react-native';

export const api = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})