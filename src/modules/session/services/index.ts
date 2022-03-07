import { PrismaClient as Model } from "@prisma/client";

import { IUser } from "../../../interfaces";

const model = new Model();

export const setSessionApp = async ({ email, password }): Promise<IUser> => {
    const user = await model.users.findUnique({
        where: {
            email_users: email,
        },
    });

    return user;
};
