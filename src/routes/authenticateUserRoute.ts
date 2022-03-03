import express from 'express'
const routerUser = express.Router()

import { getUsers, createUser } from '../modules/users/controllers/';

routerUser.get('/', getUsers);

routerUser.post('/userpost', createUser);

export default  routerUser 