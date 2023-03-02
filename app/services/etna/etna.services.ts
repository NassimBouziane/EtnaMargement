import { api } from '../ServiceHelper'

export const getWall = async(token : any) => {
  return await api.post('/etna/wall', 
	{
		token
	}).then((response) => response.data)
}

export const getWallByName = async(wallname:any,start:any,end:any,token : any) => {
	return await api.post('/etna/wall/name', 
	  {
		  token,
		  wallname,
		  start,
		  end
	  }).then((response) => response.data)
}

export const getWallByPromo = async(wallname:any,start:any,end:any,token : any) => {
	return await api.post('/etna/wall/promo', 
	  {
		token,
		wallname,
		start,
		end
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
export const getPromoByLogin = async(login : any, token: any)=>{
	return await api.post('/etna/promo/'+login,{token}).then((response)=> response.data).catch((e)=> console.log('[FAIL]'+e))
}

export const getMessage = async(id :any, token : any) => {
	return await api.post('/etna/message',
	{
		id,
		token
	}).then((response) => response.data)
}