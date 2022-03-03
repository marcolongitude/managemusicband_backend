import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()


export const responseData = {
    "data": "teste passou"
}

export const createUserData = async () => {
    const user = await prisma.users.create({
        data: {
            id_users: uuidv4(),
            name_users: 'teste',    
            email_users: 'marco@email.com'
        }
    })

    return user;
}

export default {
    createUserData,
    responseData
}