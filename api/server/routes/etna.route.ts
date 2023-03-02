import { getMessage, getNote, getPromo, getTicket, getWall, getWallByName, getWallByPromo,getPromoByLogin } from '../controllers/etna.controller';

const expressUser = require('express');

const etna = expressUser.Router();

etna.post('/wall', getWall);

etna.post('/wall/name', getWallByName)

etna.post('/wall/promo', getWallByPromo)

etna.post('/message', getMessage)

etna.post('/ticket', getTicket);

etna.post('/note', getNote)

etna.post('/promo', getPromo)
etna.post('/promo/:login', getPromoByLogin)

export default etna;