import { Request, Response } from 'express';
import axios from "axios";

const apiEtnaTicket = axios.create({
    baseURL: 'https://prepintra-api.etna-alternance.net/',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
})

const apiEtnaWall = axios.create({
  baseURL: 'https://tickets.etna-alternance.net/api/tasks.json',
  timeout: 10000,
  headers: {
    accept: 'application/json'
  },
})

async function getWall(req: Request, res: Response) {
    return await apiEtnaWall.get('/', 
    {
      headers: {Cookie: req.body.token}
    }).then((response) => res.send(response.data))
    .catch(() => {res.sendStatus(500);});
}

async function getTicket(req: Request, res: Response) {
  return await apiEtnaTicket.get('/', 
  {
    headers: {Cookie: req.body.token}
  }).then((response) => res.send(response.data))
  .catch(() => {res.sendStatus(500);});
}

export {
  getWall, getTicket
}



