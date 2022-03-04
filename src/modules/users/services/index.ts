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

export const getUsersData = async (): Promise<IUser[]> => {
    const listUsers = await model.users.findMany();

    return listUsers;
}


export const createUserData = async ({name_users, email_users}: IUserDTO): Promise<void> => {
    await model.users.create({
        data: {
            id_users: uuidv4(),
            name_users: name_users,    
            email_users: email_users
        }
    })
}
