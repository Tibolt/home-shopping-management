import { type ActionFailure, redirect, type Actions, type Action, type RequestEvent, fail } from "@sveltejs/kit";
import { db } from "$lib/db/config"
import { user, storage, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import { goto } from "$app/navigation";
import bcrypt from "bcrypt";
import { cookieJwtCreate } from "$lib/server/jwt.js";

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

    console.log({email, password, name})
    const hash = bcrypt.hashSync(password?.toString(), 10);
    console.log(hash)


    const usr = await db.select().from(user).where(eq(user.email, email.toString()))

    console.log(usr.length)
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
            name: `${new_user[0].name}'s list`,
            user_id: new_user[0].id,
            is_main: true,
        }).returning()

        const new_storage = await db.insert(storage).values({
            name: `${new_user[0].name}'s storage`,
            list_id: new_list[0].id,
            user_id: new_user[0].id,
        })

        event.cookies.set("auth_token", token, {
            path: "/",
            httpOnly: true,
            secure: false,
        })
      
        throw redirect(301, "/");
    }
    else{
        console.log("This account already exists!")
        return { error: "This account already exists!"}
    }
}

export const actions: Actions = { register }