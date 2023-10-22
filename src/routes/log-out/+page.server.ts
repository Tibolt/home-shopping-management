import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  // remove the cookie
  event.cookies.set("auth_token", "", {maxAge: 0});

  // redirect to the sign-in page
  throw redirect(301, "/login");
};