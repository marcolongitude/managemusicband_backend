import { Request, Response } from "express";
import { IUser } from "interfaces";
import * as yup from "yup";

import { CustomError } from "../../../appError/custom-error.model";
import checkPassword from "../../../util/checkPassword";
import { createToken } from "../../../util/createToken";
import { setSessionApp } from "../services";

export const SessionController = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    });

    if (!(await schema.isValid({ email, password }))) {
        throw new CustomError("Validate fails", 400, {
            error: "validate fails",
        });
    }

    const user: IUser = await setSessionApp({ email, password });

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    const { name_users, email_users, permission, password_hash } = user;

    console.log("*****************************");
    console.log(checkPassword(password, password_hash));
    console.log("*****************************");

    if (!(await checkPassword(password, password_hash))) {
        throw new CustomError("Password does not match", 401, {
            error: "password does not match",
        });
    }

    const token = createToken({ name_users, email_users, permission });

    return response.status(200).json({ token });
};
