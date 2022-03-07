import { Request, Response } from "express";
import { IUser } from "interfaces";

import { CustomError } from "../../../appError/custom-error.model";
import checkPassword from "../../../util/checkPassword";
import { createToken } from "../../../util/createToken";
import { setSessionApp } from "../services";

export const SessionController = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;

    const user: IUser = await setSessionApp({ email, password });

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    const { name_users, email_users, permission, password_hash } = user;

    if (!checkPassword(password, password_hash)) {
        throw new CustomError("Password does not match", 401, {
            error: "password does not match",
        });
    }

    const token = createToken({ name_users, email_users, permission });

    return response.status(200).json({ token });
};
