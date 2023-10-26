import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { API } from "$env/static/private"
import { db } from "$lib/db/config"
import { item, list } from "$lib/db/schema";
import { eq, lt, gte, ne, Name } from "drizzle-orm";
import { cookieJwtAuth } from "$lib/server/jwt";

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

  const userPayload = await cookieJwtAuth(token);

  try {
    const body = await request.json();
    console.log(body);

    for (const product of body) {
      const { name, amount } = product;

      console.log(`Name: ${name}, Amount: ${amount}`);
      await db.insert(item).values({
        name: name,
        amount: amount,
        list_id: params.listId,
      });
      console.log(`Inserted: Name - ${name}, Amount - ${amount}`);
    }

    return new Response(JSON.stringify({ message: "Success" }), { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
  }
}