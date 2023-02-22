import { api } from '../ServiceHelper'

export const getUser = async(login : String) => {
  return await api.get('/users/'+login).then((response) => response.data)
}

export const checkUser = async(login : String) => {
    return await api.get('/users/'+login).then((response) => response.data)
}
