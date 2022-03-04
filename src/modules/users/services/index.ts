import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const model = new PrismaClient()

interface IUserDTO {
    name_users: string;
    email_users: string;
}

interface IUser {
    id_users?: string;
    name_users?: string;
    email_users?: string;
}

export const getUsersData = async (): Promise<IUser[]> => {
    const listUsers = await model.users.findMany();

    return listUsers;
}

export const getUserByIdData = async ({id_users}: IUser): Promise<IUser> => {
    const user = await model.users.findUnique({
        where: {
            id_users: id_users
        }
    })

    return user;
}

export const getUserByEmailData = async ({email_users}: IUser): Promise<IUser> => {
    const user = await model.users.findFirst({
        where: {
            email_users: email_users
        }
    })

    return user;
}

export const updateUserById = async ({id_users, name_users}: IUser): Promise<IUser> => {
    const user = await model.users.update({
        where: {
            id_users: id_users
        },
        data: {
            name_users: name_users
        }
    })

    return user;
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
