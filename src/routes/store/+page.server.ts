import { db } from "$lib/db/config"
import { item, list, storage } from "$lib/db/schema";
import { eq, lt, gte, ne, Name, and } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";
import { writable } from "svelte/store";
import { getContext } from 'svelte';
import { parse } from "dotenv";

export const load = async ({ request, fetch, cookies, params }) => {


  // fetch the current user's todos from the server
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/login");
  }

    const userPayload = await cookieJwtAuth(token);

    let main_list = await db.select().from(list).where(and(eq(list.user_id, userPayload.id),eq(list.is_main, true))).limit(1)
//   let items = await db.select().from(item).where(eq(item.list_id, main_list[0].id)).orderBy(item.name)
    let user_store = await db.select().from(storage).where(eq(storage.user_id, userPayload.id))
    let items = await db.select().from(item).where(eq(item.storage_id, user_store[0].id)).orderBy(item.name)
    return { items: items, name: main_list[0].name, listId: main_list[0].id, storageId: user_store[0].id}
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
    minusOne: async ({request, cookies}) => {
        const {id} = Object.fromEntries(await request.formData()) as {
        id: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
        throw redirect(301, "/sign-in");
        }

        const userPayload = await cookieJwtAuth(token);
        const main_list = await db.select().from(list).where(and(eq(list.user_id, userPayload.id),eq(list.is_main, true))).limit(1)
        const existingItem = await db.select().from(item).where(eq(item.id, id))
        if (existingItem[0]) {
            let newAmount = existingItem[0].amount_in_storage - 1
            if (newAmount < 0) newAmount = 0
            if (newAmount == 0) {
                await db.update(item).set({show_in_list: true, amount: 1, amount_in_storage: 0, list_id: main_list[0].id}).where(eq(item.id, id))
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
    addNewItem: async ({request, cookies}) => {
        const {id} = Object.fromEntries(await request.formData()) as {
        id: number
        }
        // ensure the user is logged in
        const token = cookies.get("auth_token");
        if (!token) {
        throw redirect(301, "/sign-in");
        }

        const userPayload = await cookieJwtAuth(token);
        
        return { success: true };
    },
}
