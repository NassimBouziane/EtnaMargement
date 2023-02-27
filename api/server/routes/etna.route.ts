import { getNote, getPromo, getTicket, getWall } from '../controllers/etna.controller';

const expressUser = require('express');

const etna = expressUser.Router();

etna.post('/wall', getWall);

etna.post('/ticket', getTicket);

etna.post('/note', getNote)

etna.post('/promo', getPromo)

export default etna;