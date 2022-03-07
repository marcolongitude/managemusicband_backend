import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as yup from "yup";

import { CustomError } from "../../../appError/custom-error.model";
import {
    deleteUserById,
    updateUserById,
    getUserByEmailData,
    getUserByIdData,
    getUsersData,
    createUserData,
} from "../services";

export const getUsers = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const result = await getUsersData();

    if (result) return response.status(200).json({ data: result });
    throw new CustomError("Users not found", 404);
};

export const getUserById = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const { id_users } = request.params;

    const result = await getUserByIdData({ id_users });

    if (result) return response.status(200).json({ data: result });
    throw new CustomError("Users not found", 404);
};

export const getUserEmail = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const { email_users } = request.params;

    const result = await getUserByEmailData({ email_users });

    if (result) return response.status(200).json({ data: result });
    throw new CustomError("Users not found", 404);
};

export const updateUserId = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const { id_users, name_users } = request.body;
    const schema = yup.object().shape({
        id_users: yup.string().required(),
        name_users: yup.string().required(),
    });

    if (
        !(await schema.isValid({
            id_users,
            name_users,
        }))
    ) {
        throw new CustomError("Validate fails", 400, {
            error: "validate fails",
        });
    }

    const result = await updateUserById({ id_users, name_users });

    return response.status(200).json({ data: result });
    // throw new CustomError("Users not found", 404);
};

export const createUser = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const { name_users, email_users, permission, password } = request.body;
    const schema = yup.object().shape({
        name_users: yup.string().required(),
        email_users: yup.string().email().required(),
        permission: yup.string().required(),
        password: yup.string().min(6).required(),
    });

    if (
        !(await schema.isValid({
            name_users,
            email_users,
            permission,
            password,
        }))
    ) {
        throw new CustomError("Validate fails", 400, {
            error: "validate fails",
        });
    }

    const password_hash = await bcrypt.hash(password, 8);

    await createUserData({
        name_users,
        email_users,
        permission,
        password_hash,
    });

    return response.status(200).send();
};

export const deleteUserId = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const { id_users } = request.params;

    await deleteUserById({ id_users });

    return response.status(200).send();
};
