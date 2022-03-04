import { Request, Response } from 'express'

import {responseData, createUserData} from '../services';


export const getUsers = (request: Request, response: Response) => {
    response.json(responseData);
}

export const createUser = async (request: Request, response: Response) => {
    console.log(request.body)
    const { name_users, email_users } = request.body;

    await createUserData({name_users, email_users});

    return response.status(200).send();

}

export default {
    getUsers

}