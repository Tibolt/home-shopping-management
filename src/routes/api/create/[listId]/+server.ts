import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { API } from "$env/static/private"
import { db } from "$lib/db/config"
import { item, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name, and } from "drizzle-orm";
import { cookieJwtAuth } from "$lib/server/jwt";

const insertProducts = async (body) => {
  
}

export const POST: RequestHandler = async ({request, cookies, params}) => {
  // Simulate a delay... instead you'd do something interesting here...
  // await new Promise((resolve) => setTimeout(resolve, 500))

  const token = cookies.get("auth_token")
  console.log(token)

  if (!token) {
    return new Response(
      JSON.stringify({messege:"login"}), 
      {status: 300}
    )
  }

  const authHeader = request.headers.get("Authorization")
  console.log(authHeader)

  const isStorage = request.headers.get("isStorage")
  console.log(authHeader)

  const userPayload = await cookieJwtAuth(token);

  try {
    const body = await request.json();
    console.log(body);

    for (const product of body) {
      const { name, amount } = product;

      console.log(`Name: ${name}, Amount: ${amount}`);

      let existingItem
      if(isStorage) {
        existingItem = await db.select().from(item).where(and(eq(item.storage_id, params.listId),eq(item.name, name)))
        if (existingItem[0]) {
          console.log("exsiting", existingItem[0])
          const newAmount = existingItem[0].amount + amount
          await db.update(item).set({name: name, amount_in_storage: newAmount}).where(eq(item.id, existingItem[0].id))
          console.log(`updated: Name - ${name}, Amount - ${amount}`);
        }
        else {
          await db.insert(item).values({
            name: name,
            amount_in_storage: amount,
            storage_id: params.listId,
            show_in_list: false,
          });
          console.log(`Inserted: Name - ${name}, Amount - ${amount}`);
        }
      }
      else{
        existingItem = await db.select().from(item).where(and(eq(item.list_id, params.listId),eq(item.name, name)))
        if (existingItem[0]) {
          console.log("exsiting", existingItem[0])
          const newAmount = existingItem[0].amount + amount
          await db.update(item).set({name: name, amount: newAmount}).where(eq(item.id, existingItem[0].id))
          console.log(`updated: Name - ${name}, Amount - ${amount}`);
        }
        else {
          await db.insert(item).values({
            name: name,
            amount: amount,
            list_id: params.listId,
            show_in_list: true,
          });
          console.log(`Inserted: Name - ${name}, Amount - ${amount}`);
        }
      }
    }
    return new Response(JSON.stringify({ message: "Success" }), { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
  }
}