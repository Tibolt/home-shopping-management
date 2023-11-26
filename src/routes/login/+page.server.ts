import { type ActionFailure, redirect, type Actions, type Action, type RequestEvent, error, fail } from "@sveltejs/kit";
import { db } from "$lib/db/config"
import { user } from "$lib/db/schema";
import { eq, and, lt, gte, ne, Name } from "drizzle-orm";
import { goto } from "$app/navigation";
import bcrypt from "bcrypt";
import { cookieJwtCreate, cookieJwtRefresh } from "$lib/server/jwt";

export const load = async (event) => {
    // get the sessionId from the cookie
    const token = event.cookies.get("auth_token");
    
    if(!token) {
        return {clearUser: true}
    }
    return {clearUser: false}
    // throw redirect(301, "/");
}

const login: Action = async (event) => {
    const {email, password} = Object.fromEntries(await event.request.formData()) as {
        email: string
        password: string
    }
    
    if(!email || !password) {
        return fail(400, {email, message: "must provide an email and password"});
    }

    console.log({email, password})


    const usr = await db
        .select()
        .from(user)
        .where(eq(user.email, email.toString()))
        .limit(1)

    console.log(usr.length)

    if (usr.length === 0) {
        throw error(404, "user account not found");
    }

    // check if the password is correct
    const passwordIsRight = await bcrypt.compare(password.toString(), usr[0].password);

    if (!passwordIsRight) {
        throw error(400, "incorrect password...");
    }

    

    const token = await cookieJwtCreate({
        name: usr[0].name,
        email: usr[0].email,
        id: usr[0].id
    })
    console.log(token)

    event.cookies.set("auth_token", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge:60 * 60 * 24,
    })
  
    throw redirect(301, "/");
}

export const actions: Actions = { login }