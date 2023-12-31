import { db } from "$lib/db/config"
import { item, list, storage, user_list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name, and, inArray } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";
import { writable } from "svelte/store";
import { getContext, tick } from 'svelte';
import { parse } from "dotenv";
import { date } from "drizzle-orm/pg-core";

export const load = async ({ request, fetch, cookies, params }) => {

  // fetch the current user's todos from the server
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/login");
  }

  const userPayload = await cookieJwtAuth(token);

  // const list_id = getContext('list_id');
  // console.log(list_id)
  let id: number
  if(params.listId != "manifest.webmanifest") {
    id = parseInt(params.listId)
  }

  const userLists = await db.select().from(user_list).where(and(eq(user_list.user_id, userPayload.id),eq(user_list.list_id, id)))
  if (userLists.length == 0) {
    throw redirect(301, "/list");
  }

  // let itemsToUpdate = await db.select().from(item).where(and(eq(item.list_id, id),eq(item.show_in_list, false),eq(item.amount_in_storage, 0), ne(item.storage_id, 0)))
  // if(itemsToUpdate[0])
  //   await db.update(item).set({ show_in_list: true }).where(inArray(item.id, itemsToUpdate.map(item => item.id)))

  let items = await db.select().from(item).where(eq(item.list_id, id)).orderBy(item.name)
  let listName = await db.select().from(list).where(eq(list.id, params.listId))

  return { items: items, listId: params.listId, listName: listName[0].name}
}

export const actions = {
  create: async ({ request, fetch, cookies, params }) => {

    // const {tempItems} = Object.fromEntries((await request.formData())) as {
    //   tempItems: { name: String, amount: Number }[]
    // }
    
    let items = []
    const data = await request.formData()
    return {success: true}
  },
  delete: async ({ request, cookies ,params}) => {
    const {id} = Object.fromEntries(await request.formData()) as {
      id: number
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const userPayload = await cookieJwtAuth(token);
    const mainList = await db.select({id: list.id, name: list.name, is_main: list.is_main}).from(list).where(and(eq(list.is_main, true), eq(list.id, params.listId)))
    
    // TODO: ASK IF USER WANTS TO DELETE FROM MAIN LIST OR JUST MARK AS NOT BOUGHT
    if(mainList.length > 0) {
      const deleted = await db.update(item).set({show_in_list: false, ticked: false, amount: 0}).where(eq(item.id, id))
      // if (deleted.rowCount == 0) {
      //   return fail(400, {message: "You haven't bought this item yet, if you want to delete use edit item page"})
      // }
    }
    else
      await db.delete(item).where(eq(item.id, id))
    console.log("deleted", id)
    return { success: true };
  },
  editName: async ({ request, cookies}) => {
    const {id, name} = Object.fromEntries(await request.formData()) as {
      id: number
      name: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.update(item).set({name: name}).where(eq(item.id, id))
    console.log("edited", id, name)
    return { success: true };
  },
  editAmount: async ({ request, cookies}) => {
    const {id, amount, unit} = Object.fromEntries(await request.formData()) as {
      id: number
      amount: number
      unit: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.update(item).set({amount: amount, unit: unit}).where(eq(item.id, id))
    console.log("edited", id, amount, unit)
    return { success: true };
  },
  editPrize: async ({ request, cookies}) => {
    const {id, prize} = Object.fromEntries(await request.formData()) as {
      id: number
      prize: number
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.update(item).set({prize: prize}).where(eq(item.id, id))
    console.log("edited", id, prize)
    return { success: true };
  },
  edit: async ({ request, cookies}) => {
    const {id, name, amount, unit, prize} = Object.fromEntries(await request.formData()) as {
      id: number
      name: string
      amount: number
      unit: string
      prize: number
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.update(item).set({prize: prize, name: name, amount: amount, unit: unit}).where(eq(item.id, id))
    console.log("edited", id, prize)
    return { success: true };
  },
  ticked: async ({ request, cookies, params}) => {
    const {id, ticked} = Object.fromEntries(await request.formData()) as {
      id: number
      ticked: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/login");
    }

    const today = new Date().toLocaleDateString("en-GB").toString()

    const userPayload = await cookieJwtAuth(token);
    const mainList = await db.select({id: list.id, name: list.name, is_main: list.is_main}).from(list).where(and(eq(list.id, params.listId),eq(list.is_main, true)))
    console.log("mainList", mainList)
    if(ticked == "false") {
      if(mainList.length > 0) {
        const store = await db.select().from(storage).where(eq(storage.list_id, mainList[0].id))
        const storageItem = await db.select().from(item).where(eq(item.id, id))
        const newAmount = storageItem[0].amount + storageItem[0].amount_in_storage
        console.log(store)
        await db.update(item).set({ticked: true, amount_in_storage: newAmount, storage_id: store[0].id, purchased_date: today}).where(eq(item.id, id))
      }
      else
        await db.update(item).set({ticked: true, purchased_date: today}).where(eq(item.id, id))
    }
    else
      await db.update(item).set({ticked: false, purchased_date: ""}).where(eq(item.id, id))
      
    console.log("marked", id, ticked)
    return { success: true };
  },
}
