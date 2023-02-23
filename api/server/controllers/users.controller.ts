import { Request, Response } from 'express';
import axios from 'axios'

export const apiEtnaAuth = axios.create({
    baseURL: 'https://auth.etna-alternance.net',
    timeout: 10000,
    headers: {
      accept: 'application/json'
    },
  })

async function getConnected(req: Request, res: Response) {
    
    return await apiEtnaAuth.get('/identity', 
    {
      headers: {Cookie: req.body.token}
    }).then((response) => res.send(response.data))
    .catch(() => {res.sendStatus(500);});
}
  
async function login(req: Request, res: Response) {
    return await apiEtnaAuth.post('/identity', {login : req.body.login, password: req.body.password} )
    .then((response) => res.send(response.headers))
    .catch(() => {res.sendStatus(400)});
}

async function getUser(req: Request, res:Response){
    return await apiEtnaAuth.get('api/users/'+req.params.id, {
        headers: {Cookie: req.body.token} 
    })
    .then((response) => res.send(response.data))
    .catch(() => {res.sendStatus(400)});
}

export {
    login,
    getConnected,
    getUser
}
