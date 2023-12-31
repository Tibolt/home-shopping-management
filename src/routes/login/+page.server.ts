import { type ActionFailure, redirect, type Actions, type Action, type RequestEvent, error, fail } from "@sveltejs/kit";
import { db } from "$lib/db/config"
import { user, user_storage } from "$lib/db/schema";
import { eq, and, lt, gte, ne, Name } from "drizzle-orm";
import { goto } from "$app/navigation";
import bcrypt from "bcrypt";
import { cookieJwtAuth, cookieJwtCreate, cookieJwtRefresh } from "$lib/server/jwt";

export const load = async (event) => {
    // get the sessionId from the cookie
    const token = event.cookies.get("auth_token");
    
    if(!token) {
        return {clearUser: true}
    }
    
    const user = await cookieJwtAuth(token);
    throw redirect(301, "/");
    // return {clearUser: false}
}

const login: Action = async (event) => {
    const {email, password} = Object.fromEntries(await event.request.formData()) as {
        email: string
        password: string
    }
    
    if(!email || !password) {
        return fail(401, {email, message: "must provide an email and password"});
    }

    const usr = await db
        .select()
        .from(user)
        .where(eq(user.email, email.toString()))
        .limit(1)


    if (usr.length === 0) {
        return fail(401, {message: "user account not found"});
    }

    // check if the password is correct
    const passwordIsRight = await bcrypt.compare(password.toString(), usr[0].password);

    if (!passwordIsRight) {
        return fail(401, {message: "incorrect password"});
    }

    const token = await cookieJwtCreate({
        name: usr[0].name,
        email: usr[0].email,
        id: usr[0].id
    })

    event.cookies.set("auth_token", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge:60 * 60 * 2,
    })

    const refreshToken = await cookieJwtRefresh({
        name: usr[0].name,
        email: usr[0].email,
        id: usr[0].id
    })

    event.cookies.set("refresh_token", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge:60 * 60 * 24 * 30,
    })

    const store = await db.select().from(user_storage).where(eq(user_storage.user_id, usr[0].id))
    if(store.length > 0){
        event.cookies.set("storageID", store[0].storage_id.toString(), {
            path: "/",
            httpOnly: true,
            secure: false,
        })
    }
  
    throw redirect(301, "/");
}

export const actions: Actions = { login }