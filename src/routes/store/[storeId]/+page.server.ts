import { db } from "$lib/db/config"
import { item, list, storage, user_list, user_storage, user } from "$lib/db/schema";
import { eq, lt, gte, ne, Name, and, desc, asc } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";
import { writable } from "svelte/store";
import { getContext } from 'svelte';
import { parse } from "dotenv";
import { isValidEmail } from "$lib/utils";

export const load = async ({ request, fetch, cookies, params }) => {


    // fetch the current user's todos from the server
    const token = cookies.get("auth_token");

    if (!token) {
        throw redirect(301, "/login");
    }
    const userPayload = await cookieJwtAuth(token);
    let userStores = await db.select({id: storage.id, name: storage.name, author: storage.author, listId: storage.list_id}).from(user_storage).leftJoin(storage, eq(storage.id, user_storage.storage_id)).where(eq(user_storage.user_id, userPayload.id)).orderBy(desc(storage.author))
    
    let userStore
    let id: number
    if(params.storeId != "manifest.webmanifest")
    {
        id = parseInt(params.storeId)
    }
    if (id > 0) {
        userStore = await db.select({id: storage.id, name: storage.name, author: storage.author, listId: storage.list_id}).from(user_storage).leftJoin(storage, eq(storage.id, user_storage.storage_id)).where(and(eq(user_storage.user_id, userPayload.id), eq(user_storage.storage_id, id)))
    }
    else {
        userStore = userStores
    }

    

    let lists = await db.select({id: list.id, name: list.name, is_main: list.is_main}).from(user_list).leftJoin(list, eq(user_list.list_id, list.id)).where(eq(user_list.user_id, userPayload.id)).orderBy(list.name)
    let items = await db.select().from(item).where(eq(item.storage_id, userStore[0].id)).orderBy(item.name)

    return { items: items, name: userStore[0].name, listId: userStore[0].listId, storageId: userStore[0].id, stores: userStores}
}

export const actions = {
    addOne: async ({request, cookies}) => {
        const {id} = Object.fromEntries(await request.formData()) as {
        id: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
        throw redirect(301, "/sign-in");
        }

        const userPayload = await cookieJwtAuth(token);
        const existingItem = await db.select().from(item).where(eq(item.id, id))
        if (existingItem[0]) {
            const newAmount = existingItem[0].amount_in_storage + 1
            await db.update(item).set({amount_in_storage: newAmount}).where(eq(item.id, id))
            console.log("added one", id)
        }
        return { success: true };
    },
    minusOne: async ({request, cookies, params}) => {
        const {id} = Object.fromEntries(await request.formData()) as {
        id: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
        throw redirect(301, "/sign-in");
        }

        const userPayload = await cookieJwtAuth(token);
        const main_list = await db.select().from(storage).where(eq(storage.id, params.storeId))
        const existingItem = await db.select().from(item).where(eq(item.id, id))
        if (existingItem[0]) {
            let newAmount = existingItem[0].amount_in_storage - 1
            if (newAmount <= existingItem[0].restock_number || newAmount < 0) {
              newAmount = existingItem[0].restock_number
              await db.update(item).set({show_in_list: true, amount: 1, amount_in_storage: newAmount, list_id: main_list[0].list_id, ticked: false}).where(eq(item.id, id))
              console.log("0 product, add to list", id)
            }
            else {
                await db.update(item).set({amount_in_storage: newAmount}).where(eq(item.id, id))
                console.log("minus one", id)
            }
        }
        return { success: true };
    },
    delete: async ({ request, cookies}) => {
        const {id} = Object.fromEntries(await request.formData()) as {
        id: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
        throw redirect(301, "/sign-in");
        }

        const userPayload = await cookieJwtAuth(token);

        await db.delete(item).where(eq(item.id, id))
        console.log("deleted", id)
        return { success: true };
    },
    share: async ({ request, cookies, params}) => {
        const {storageId, email} = Object.fromEntries(await request.formData()) as {
            storageId: number
            email: string
          }
          // ensure the user is logged in
          const token = cookies.get("auth_token");
          if (!token) {
            throw redirect(301, "/sign-in");
          }
      
          const userPayload = await cookieJwtAuth(token);

          // check if email is not empy sting and if it is email
          if(!isValidEmail(email)) {
            console.log("ERROR email is not valid")
            return fail(500, { message: 'Email is not valid.' });
          }
      
          // check if user with this email exists
          const usr = await db.select().from(user).where(eq(user.email, email))
      
          if(usr.length == 0) {
            console.log("ERROR user with this email does not exist")
            return fail(500, { message: 'User with this email does not exist.' });
          }
      
          // check if user already has this list
          const shared = await db.select().from(user_storage).where(and(eq(user_storage.user_id, usr[0].id), eq(user_storage.storage_id, storageId)))
          if(shared.length > 0) {
            console.log("ERROR user already has this storage")
            return fail(500, { message: 'User already has this storage.' });
          }
      
          await db.insert(user_storage).values({user_id: usr[0].id, storage_id: storageId})
      
          console.log("shared list", storageId)
          return { success: true, message: "List shared to user " + usr[0].name };
    },
    edit: async ({ request, cookies }) => {
        try {
          const {name, storageId} = Object.fromEntries(await request.formData()) as {
            name: string
            storageId: number
          }
          // ensure the user is logged in
          const token = cookies.get("auth_token");
          if (!token) {
            throw redirect(301, "/sign-in");
          }
      
          await db.update(storage).set({name: name}).where(eq(storage.id, storageId))
          return { success: true };
        } catch (err) {
          console.error(err);
          return fail(500, { message: 'Could not edit name.' });
        }
    },
    editRestock: async ({ request, cookies }) => {
      try {
        const {resuplyNumber, itemId} = Object.fromEntries(await request.formData()) as {
          resuplyNumber: number
          itemId: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
          throw redirect(301, "/sign-in");
        }

        console.log("resuplyNumber", resuplyNumber, "itemId", itemId)
    
        await db.update(item).set({restock_number: resuplyNumber}).where(eq(item.id, itemId))
        console.log("edited restock", itemId, resuplyNumber)
        return { success: true };
      } catch (err) {
        console.error(err);
        return fail(500, { message: 'Could not edit restock number.' });
      }
  }
}
