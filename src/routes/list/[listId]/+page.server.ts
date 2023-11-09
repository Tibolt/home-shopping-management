import { db } from "$lib/db/config"
import { item, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";
import { writable } from "svelte/store";
import { getContext } from 'svelte';
import { parse } from "dotenv";

export const load = async ({ request, fetch, cookies, params }) => {

  console.log(params)

  // fetch the current user's todos from the server
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/login");
  }

  const userPayload = await cookieJwtAuth(token);

  // const list_id = getContext('list_id');
  // console.log(list_id)
  let id: number
  if(params.listId != "manifest.webmanifest")
    id = parseInt(params.listId)
  let items = await db.select().from(item).where(eq(item.list_id, id)).orderBy(item.name)
  let listName = await db.select().from(list).where(eq(list.id, params.listId))
  return { items: items, listId: params.listId, listName: listName[0].name }
}

export const actions = {
  create: async ({ request, fetch, cookies, params }) => {

    // const {tempItems} = Object.fromEntries((await request.formData())) as {
    //   tempItems: { name: String, amount: Number }[]
    // }
    
    let items = []
    // const tempItems = ((await request.formData()).getAll("tempItems"))
    const data = await request.formData()

    for (const [key, value] of data.entries()) {

    }





    
    // console.table([...data.entries()])

    // console.log(tempItems)
    return {success: true}

    const {name, amount} = Object.fromEntries(await request.formData()) as {
      name: string
      amount: number
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.insert(item).values({
      name: name,
      amount: amount,
      list_id: params.listId
    })

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
  editName: async ({ request, cookies}) => {
    const {id, name} = Object.fromEntries(await request.formData()) as {
      id: number
      name: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in");
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
      throw redirect(301, "/sign-in");
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
      throw redirect(301, "/sign-in");
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
      throw redirect(301, "/sign-in");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.update(item).set({prize: prize, name: name, amount: amount, unit: unit}).where(eq(item.id, id))
    console.log("edited", id, prize)
    return { success: true };
  },
  
}
