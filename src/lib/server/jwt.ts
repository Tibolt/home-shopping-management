// import { JWT_SECRET } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

type JWTPayload = {
    name: string;
    email: string;
    id: number;
};

export const cookieJwtCreate = async (data: JWTPayload) => {
    const token: string = await jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "2h"})
    return token
}

export const cookieJwtRefresh = async (data: JWTPayload) => {
    const token: string = await jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "30d"})
    return token
}

export const cookieJwtAuth = async (token: string) => {
    try {
        const payload: JWTPayload = jwt.verify(token, process.env.JWT_SECRET)
        return payload
    } catch(err) {
        console.log(err)
        throw redirect(301, "/login")
    }
}