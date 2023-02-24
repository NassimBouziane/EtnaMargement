import { api } from '../ServiceHelper'

export const getWall = async(token : any) => {
  return await api.post('/etna/wall', 
	{
		token
	}).then((response) => response.data)
}

export const getTicket = async(token : any) => {
	return await api.post('/etna/ticket',
	{
		token
	}).then((response) => response.data)
}

export const getNote = async(token:any, login:string, promo:string) => {
	return await api.post('/etna/note',
	{
		token,
		login,
		promo
	}).then((response) => response.data)
}

export const getPromo = async(token : any) => {
	return await api.post('/etna/promo',
	{
		token
	}).then((response) => response.data)
}