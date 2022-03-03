import express from 'express'
const routerUser = express.Router()

import { getUsers } from '../controllers/users';

routerUser.get('/', getUsers);

export default  routerUser 