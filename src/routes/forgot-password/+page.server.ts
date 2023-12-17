import { db } from '$lib/db/config.js';
import { user } from '$lib/db/schema.js';
import { isValidEmail } from '$lib/utils.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import jwt from "jsonwebtoken";

export const actions = {
	default: async (event) => {
		const { email } = Object.fromEntries(await event.request.formData()) as {
            email: string;
        };

        if (!email || !isValidEmail(email)) {
            return fail(400, {message: 'must provide valid email' });
        }

        const usr = await db.select().from(user).where(eq(user.email, email));
        if (usr[0]) {
            const payload = {
                id: usr[0].id,
                email: usr[0].email,
                name: usr[0].name
            };

            const id = usr[0].id;
            const secret = process.env.JWT_SECRET + usr[0].password;

            const token = jwt.sign(payload, secret, {expiresIn: '30m'});
            const link = `http://localhost:5173/forgot-password/${id}/${token}`;
            console.log(link)
            return {message: 'email sent'};
        }
	}
};