import { getConnected, getPhoto, getUser, login } from '../controllers/users.controller';


const expressUser = require('express');

const users = expressUser.Router();

users.post('/identity', getConnected);

users.post('/', login);

users.post('/:id', getUser)

users.post('/:login/photo', getPhoto)

export default users;
