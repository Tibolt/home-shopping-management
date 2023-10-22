// import { JWT_SECRET } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

type JWTPayload = {
    name: string;
    email: string;
    id: number;
};

export const cookieJwtCreate = async (data: JWTPayload) => {
    const token: string = await jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "1h"})
    return token
}

export const cookieJwtAuth = async (token: string) => {
    try {
        const payload: JWTPayload = jwt.verify(token, process.env.JWT_SECRET)
        return payload
    } catch(err) {
        console.log("invalid or missing JWT, you are not logged in")
        throw error(401, "invalid or missing JWT, you are not logged in");
    }
}