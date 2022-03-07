import { Request, Response } from "express";
import * as yup from "yup";

import { CustomError } from "../../../appError/custom-error.model";
import { setSessionApp } from "../services";

export const SessionController = async (
    request: Request,
    response: Response
): Promise<Response> => {
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

    const token: string = await setSessionApp({ email, password });

    return response.status(200).json({ token });
};
