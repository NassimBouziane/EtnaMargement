import axios from 'axios'
import {IP} from "@env"
console.log(IP)



export const api = axios.create({
    baseURL: "http://192.168.1.89:3000",
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})
