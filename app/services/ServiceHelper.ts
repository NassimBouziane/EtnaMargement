import axios from 'axios'
import {IP} from "@env"
console.log(IP)

export const api = axios.create({
    baseURL: 'http://'+ IP,
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})
