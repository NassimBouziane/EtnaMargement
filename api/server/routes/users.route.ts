import { getConnected, login } from '../controllers/users.controller';
  
const expressUser = require('express');

const users = expressUser.Router();

users.post('/identity', getConnected);

users.post('/', login);

export default users;