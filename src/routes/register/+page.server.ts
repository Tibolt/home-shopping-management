import { type ActionFailure, redirect, type Actions, type Action, type RequestEvent, fail } from "@sveltejs/kit";
import { db } from "$lib/db/config"
import { user, storage, list, shared_lists, user_list, user_storage } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import { goto } from "$app/navigation";
import bcrypt from "bcrypt";
import { cookieJwtCreate, cookieJwtRefresh } from "$lib/server/jwt.js";
import { isValidEmail } from "$lib/utils";

export const load = async (event) => {
    // get the token from the cookie
    const token = event.cookies.get("auth_token");
  
    // if there is a token, redirect to the user page
    if (token) {
        throw redirect(301, "/");
    }
  };

const register: Action = async (event) => {
    const {email, password, confirmPassword, name} = Object.fromEntries(await event.request.formData()) as {
        email: string
        password: string
        confirmPassword: string
        name: string
      }

    if(!email || !password || !name) {
        return fail(400, {email, name, message: "must provide an email and password"});
    }

    if(password !== confirmPassword) {
        return fail(400, {email, name, message: "passwords do not match"})
    }

    if(!isValidEmail(email)) {
        return fail(500, { message: 'Email is not valid.' });
    }

    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hashSync(password?.toString(), salt);


    const usr = await db.select().from(user).where(eq(user.email, email.toString()))

    if (usr.length == 0) {
        const new_user = await db.insert(user).values({
            email: email.toString(),
            password: hash,
            name: name.toString()
        }).returning()

        const token = await cookieJwtCreate({
            name: name.toString(),
            email: email.toString(),
            id: new_user[0].id
        })

        const new_list = await db.insert(list).values({
            name: `${new_user[0].name}`,
            is_main: true,
        }).returning()

        const new_storage = await db.insert(storage).values({
            name: `${new_user[0].name}`,
            author: new_user[0].id,
            list_id: new_list[0].id,
        }).returning()

        await db.insert(user_list).values({
            user_id: new_user[0].id,
            list_id: new_list[0].id,
        })

        await db.insert(user_storage).values({
            user_id: new_user[0].id,
            storage_id: new_storage[0].id,
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

        const store = await db.select().from(user_storage).where(eq(user_storage.user_id, new_user[0].id))
        if(store.length > 0){
            event.cookies.set("storageID", store[0].storage_id.toString(), {
                path: "/",
                httpOnly: true,
                secure: false,
            })
        }
      
        throw redirect(301, "/");
    }
    else{
        return fail(400, {name, message: "This account already exists!"})
    }
}

export const actions: Actions = { register }