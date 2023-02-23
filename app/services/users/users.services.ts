import { api } from '../ServiceHelper'

export const checkUser = async(login : String, token : any) => {
    return await api.post('/users/'+login, {
      token
    }).then((response) => response.data)
}

export const postLogin = async(login : String, password : String) => {
  return await api.post('/users/', {
      login,
      password,
    }).then((response) => response.data)
}

export const fetchUserConnected = async(token:any) => {
    return await api.post('/users/identity',
    {
      token
    }).then((response) => response.data)
}
