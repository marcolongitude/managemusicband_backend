import express from 'express'
const usersRoutes = express.Router()

import {deleteUserId, updateUserId, getUserEmail, getUserById ,getUsers, createUser } from '../modules/users/controllers/';

usersRoutes.get('/', getUsers);

usersRoutes.get('/id/:id_users', getUserById);

usersRoutes.get('/email/:email_users', getUserEmail);

usersRoutes.put('/', updateUserId);

usersRoutes.delete('/:id_users', deleteUserId);

usersRoutes.post('/', createUser);

export  {usersRoutes} 