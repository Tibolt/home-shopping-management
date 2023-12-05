import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  // remove the cookie
  // event.cookies.set("auth_token", "", {maxAge: 0});
  event.cookies.delete("auth_token")
  // event.cookies.set("storageID", "", {maxAge: 0});
  event.cookies.delete("storageID")

  // redirect to the sign-in page
  throw redirect(301, "/login");
};