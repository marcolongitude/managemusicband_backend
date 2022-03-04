import { response, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const model = new PrismaClient()

interface IUserDTO {
    name_users: string;
    email_users: string;
}

interface IUser {
    id_users: string;
    name_users: string;
    email_users: string;
}


export const responseData = {
    "data": "teste passou"
}

export const createUserData = async ({name_users, email_users}: IUserDTO): Promise<void> => {
    console.log('xxxxxxxxxxxxxxxxxxxx')
    console.log(name_users, email_users)
    console.log('xxxxxxxxxxxxxxxxxxxx')
    await model.users.create({
        data: {
            id_users: uuidv4(),
            name_users: name_users,    
            email_users: email_users
        }
    })
}

export default {
    createUserData,
    responseData
}