import { Request, Response } from 'express'

import {getUsersData, createUserData} from '../services';


export const getUsers = async (request: Request, response: Response) => {
    const result = await getUsersData();

    if(result) 
        return response.status(200).json({data: result});

    return response.status(500).json({message: 'deu ruim'})
}

export const createUser = async (request: Request, response: Response) => {
    const { name_users, email_users } = request.body;

    await createUserData({name_users, email_users});

    return response.status(200).send();

}