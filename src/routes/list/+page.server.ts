import { db } from "$lib/db/config"
import { item, list, storage, user, shared_lists, user_list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name, asc, desc, and, leftjoin, all} from "drizzle-orm";
import type { PageLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";


function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email !== '' && emailRegex.test(email);
}

export const load = async ({cookies, fetch}) => {
  // fetch the current user's todos from the server
  const token = cookies.get("auth_token");
  console.log(token || "nie ma")

  if (!token) {
    throw redirect(301, "/login");
  }

  const userPayload = await cookieJwtAuth(token);

  // const todos = await db
  //   .select({
  //     completed: todosTable.completed,
  //     description: todosTable.description,
  //     title: todosTable.title,
  //     id: todosTable.id,
  //   })
  //   .from(todosTable)
  //   .where(eq(todosTable.user_id, userPayload.id));
  // let lists = await db.select().from(list).rightJoin(shared_lists, eq(list.id, shared_lists.id))
  // let lists = await db.select().from(user_list).leftJoin(list, eq(user_list.list_id, list.id))

  let lists = await db.select({id: list.id, name: list.name, is_main: list.is_main}).from(user_list).leftJoin(list, eq(user_list.list_id, list.id)).where(eq(user_list.user_id, userPayload.id)).orderBy(list.name)

  let listsInfo = [];
  for (const list of lists) {
    const allItems = await db.select().from(item).where(and(eq(item.list_id, list.id),eq(item.show_in_list, true)))
    const tickedItems = await db.select().from(item).where(and(eq(item.list_id, list.id), eq(item.ticked, true)))

    const itemsCount = allItems.length
    const tickedItemsCount = tickedItems.length
    listsInfo.push({ list, itemsCount, tickedItemsCount });
  }
  return {listsInfo}
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


    let newList = await db.insert(list).values({
      name: name.toString(),
      content: content.toString(),
    }).returning()

    await db.insert(user_list).values({
      user_id: userPayload.id,
      list_id: newList[0].id,
    })

    return { success: true };
  },
  edit: async ({ request, cookies }) => {
    try {
      const {name, listId} = Object.fromEntries(await request.formData()) as {
        name: string
        listId: number
      }
      // ensure the user is logged in
      const token = cookies.get("auth_token");
      if (!token) {
        throw redirect(301, "/sign-in");
      }
  
      await db.update(list).set({name: name}).where(eq(list.id, listId))
      console.log(name, listId)
      return { success: true };
    } catch (err) {
      console.error(err);
      return fail(500, { message: 'Could not edit name.' });
    }
  },
  delete: async ({ request, cookies}) => {
    const {listId, isMain} = Object.fromEntries(await request.formData()) as {
      listId: number
      isMain: string
    }
    // ensure the user is logged in
    const token = cookies.get("auth_token");
    if (!token) {
      throw redirect(301, "/sign-in");
    }

    const userPayload = await cookieJwtAuth(token);

    if(isMain=="false")
      await db.delete(list).where(eq(list.id, listId))
    else {
      console.log("ERROR cant delete your main list")
      return { error: true };
    }
    console.log("deleted", listId)
    return { success: true };
  },
  share: async ({ request, cookies}) => {
    const {listId, isMain, email} = Object.fromEntries(await request.formData()) as {
      listId: number
      isMain: string
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
    const shared = await db.select().from(user_list).where(and(eq(user_list.user_id, usr[0].id), eq(user_list.list_id, listId)))
    if(shared.length > 0) {
      console.log("ERROR user already has this list")
      return fail(500, { message: 'User already has this list.' });
    }

    await db.insert(user_list).values({user_id: usr[0].id, list_id: listId})

    console.log("shared list", listId)
    return { success: true, message: "List shared to user " + usr[0].name };
  },
}