import { v4 as uuidv4 } from "uuid";

import { PrismaClient as Model } from "@prisma/client";

const model = new Model();

interface IUser {
    id_users: string;
    name_users: string;
    email_users: string;
}

export const getUsersData = async (): Promise<IUser[]> => {
    const listUsers = await model.users.findMany();

    return listUsers;
};

export const getUserByIdData = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<IUser> => {
    const user = await model.users.findUnique({
        where: {
            id_users,
        },
    });

    return user;
};

export const getUserByEmailData = async ({
    email_users,
}: Pick<IUser, "email_users">): Promise<IUser> => {
    const user = await model.users.findFirst({
        where: {
            email_users,
        },
    });

    return user;
};

export const updateUserById = async ({
    id_users,
    name_users,
}: Pick<IUser, "id_users" | "name_users">): Promise<IUser> => {
    const user = await model.users.update({
        where: {
            id_users,
        },
        data: {
            name_users,
        },
    });

    return user;
};

export const createUserData = async ({
    name_users,
    email_users,
}: Omit<IUser, "id_users">): Promise<void> => {
    await model.users.create({
        data: {
            id_users: uuidv4(),
            name_users,
            email_users,
        },
    });
};

export const deleteUserById = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<void> => {
    await model.users.delete({
        where: {
            id_users,
        },
    });
};
