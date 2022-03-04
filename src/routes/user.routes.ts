import express from 'express'
const usersRoutes = express.Router()

import { getUserEmail, getUserById ,getUsers, createUser } from '../modules/users/controllers/';

usersRoutes.get('/', getUsers);

usersRoutes.get('/id/:id_users', getUserById);

usersRoutes.get('/email/:email_users', getUserEmail);

usersRoutes.post('/', createUser);

export  {usersRoutes} 