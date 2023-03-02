import axios from 'axios'
import {IP} from "@env"

export const api = axios.create({
    baseURL: 'http://'+ IP,
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})
