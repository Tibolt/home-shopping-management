import { db } from "$lib/db/config"
import { item, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { cookieJwtAuth } from "$lib/server/jwt";

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
  
  let lists = await db.select().from(list).where(eq(list.user_id, userPayload.id))
  return { lists }
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