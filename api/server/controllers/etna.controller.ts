import { Request, Response } from 'express';
import axios from "axios";

const apiEtna = axios.create({
    baseURL: 'https://intra-api.etna-alternance.net/',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})

const apiEtnaTicket = axios.create({
  baseURL: 'https://tickets.etna-alternance.net/api/tasks.json',
  timeout: 10000,
  headers: {
    accept: 'application/json'
  },
})


async function getWall(req: Request, res: Response) {
    return await apiEtna.get('/walls', 
    {
      headers: {Cookie: req.body.token}
    }).then((response) => res.send(response.data))
    .catch(() => {res.sendStatus(500);});
}

async function getWallByName(req: Request, res: Response){
  return await apiEtna.get('/walls/'+ req.body.wallname+'/conversations?from='+req.body.start+'&size='+req.body.end,
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);})
}

async function getWallByPromo(req: Request, res: Response){
  return await apiEtna.get('/terms/'+ req.body.wallname+'/conversations?from='+req.body.start+'&size='+req.body.end,
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);})
}

async function getMessage(req: Request, res: Response){
  return await apiEtna.get('/conversations/'+ req.body.id+'/messages',
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);})
} 

async function getNote(req: Request, res: Response) {
  return await apiEtna.get('/terms/'+ req.body.promo +'/students/'+req.body.login+'/marks', 
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);});
}

async function getTicket(req: Request, res: Response) {
  return await apiEtnaTicket.get('', 
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);});
}

async function getPromo(req: Request, res: Response) {
  return await apiEtna.get('/promo', 
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);});
}
async function getPromoByLogin(req:Request, res:Response){
  return await apiEtna.get('/promo?login='+req.params.login,  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);});
}

export {
  getWall, getNote, getTicket, getPromo, getWallByName, getWallByPromo, getMessage,
  getPromoByLogin

}



