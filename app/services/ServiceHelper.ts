import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://172.16.31.137:3000',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})
