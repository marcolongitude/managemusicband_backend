import { v4 as uuidv4 } from "uuid";

import { PrismaClient as Model } from "@prisma/client";

import { CustomError } from "../../../appError/custom-error.model";
import { IUser } from "../../../interfaces";

const model = new Model();

interface IResponse {
    data: IUser[] | IUser;
}

export const getUsersData = async (): Promise<IResponse> => {
    const listUsers = await model.users.findMany();

    return { data: listUsers };
};

export const getUserByIdData = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<IResponse> => {
    const user = await model.users.findUnique({
        where: {
            id_users,
        },
    });

    return { data: user };
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
    permission,
    password_hash,
}: Omit<IUser, "id_users">): Promise<void> => {
    const user = await getUserByEmailData({ email_users });

    if (user) throw new CustomError("User already exists", 401);

    await model.users.create({
        data: {
            id_users: uuidv4(),
            name_users,
            email_users,
            permission,
            password_hash,
        },
    });
};

export const deleteUserById = async ({
    id_users,
}: Pick<IUser, "id_users">): Promise<void> => {
    const user = await getUserByIdData({ id_users });

    if (!user) throw new CustomError("User not found", 401);

    await model.users.delete({
        where: {
            id_users,
        },
    });
};
