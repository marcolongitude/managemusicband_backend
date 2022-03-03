import express from 'express'
const routerUser = express.Router()

import { getUsers } from '../modules/users/controllers/';

routerUser.get('/', getUsers);

export default  routerUser 