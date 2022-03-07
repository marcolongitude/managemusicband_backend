import { PrismaClient as Model } from "@prisma/client";

import { CustomError } from "../../../appError/custom-error.model";
import { IUser } from "../../../interfaces";
import checkPassword from "../../../util/checkPassword";
import { createToken } from "../../../util/createToken";

const model = new Model();

export const setSessionApp = async ({ email, password }): Promise<string> => {
    const user: IUser = await model.users.findUnique({
        where: {
            email_users: email,
        },
    });

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    const { name_users, email_users, permission, password_hash } = user;

    const passwordMatched = await checkPassword(password, password_hash);

    if (!passwordMatched) {
        throw new CustomError("Password does not match", 401, {
            error: "password does not match",
        });
    }

    const token = createToken({ name_users, email_users, permission });
    return token;
};
