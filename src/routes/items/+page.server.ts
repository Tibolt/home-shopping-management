import { db } from "$lib/db/config"
import { item, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";
import { writable } from "svelte/store";
import { getContext } from 'svelte';

export const load = async ({ request, fetch, cookies }) => {
  // fetch the current user's todos from the server
  const token = cookies.get("auth_token");

  if (!token) {
    throw redirect(301, "/login");
  }

  const userPayload = await cookieJwtAuth(token);

  // const list_id = getContext('list_id');
  // console.log(list_id)
  
  let items = await db.select().from(item)//.where(eq(item.list_id, list_id))
  return { items }
}

export const actions = {
  create: async ({ request, fetch, cookies }) => {
    const {name, content} = Object.fromEntries(await request.formData()) as {
      name: string
      content: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in");
    }

    const userPayload = await cookieJwtAuth(token);

    await db.insert(list).values({
      name: name.toString(),
      content: content.toString(),
      user_id: userPayload.id
    })

    return { success: true };
  },
}
