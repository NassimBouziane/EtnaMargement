import { getTicket, getWall } from '../controllers/etna.controller';

const expressUser = require('express');

const etna = expressUser.Router();

etna.post('/wall', getWall);

etna.post('/ticket', getTicket);

export default etna;