import express from 'express'
const usersRoutes = express.Router()

import { getUser ,getUsers, createUser } from '../modules/users/controllers/';

usersRoutes.get('/', getUsers);

usersRoutes.get('/:id_users', getUser)

usersRoutes.post('/', createUser);

export  {usersRoutes} 