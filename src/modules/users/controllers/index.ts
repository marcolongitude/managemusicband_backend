import { Request, Response } from 'express'

import {deleteUserById, updateUserById, getUserByEmailData, getUserByIdData, getUsersData, createUserData} from '../services';


export const getUsers = async (request: Request, response: Response) => {
    const result = await getUsersData();

    if(result) 
        return response.status(200).json({data: result});

    return response.status(500).json({message: 'deu ruim'})
}

export const getUserById = async (request: Request, response: Response) => {
    const { id_users } = request.params;

    const result = await getUserByIdData({id_users});

    if(result) 
        return response.status(200).json({data: result})
    
    return response.status(500).json({message: 'deu ruim'})
}

export const getUserEmail = async (request: Request, response: Response) => {
    const { email_users } = request.params;

    const result = await getUserByEmailData({email_users});

    if(result)
        return response.status(200).json({data: result});

    return response.status(500).json({message: 'deu ruim'})
}

export const updateUserId = async (request: Request, response: Response) => {
    const { id_users, name_users } = request.body;

    const result = await updateUserById({id_users, name_users});

    if(result)
        return response.status(200).json({data: result})

    return response.status(500).json({message: 'deu ruim'})
}

export const createUser = async (request: Request, response: Response) => {
    const { name_users, email_users } = request.body;

    await createUserData({name_users, email_users});

    return response.status(200).send();
}

export const deleteUserId = async (request: Request, response: Response) => {
    const { id_users } = request.params;

    await deleteUserById({id_users});

    return response.status(200).send();
}