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