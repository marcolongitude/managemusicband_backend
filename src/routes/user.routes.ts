import express from 'express'
const usersRoutes = express.Router()

import { getUsers, createUser } from '../modules/users/controllers/';

usersRoutes.get('/', getUsers);

usersRoutes.post('/', createUser);

export  {usersRoutes} 