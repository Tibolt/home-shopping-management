import { db } from '$lib/db/config.js';
import { user } from '$lib/db/schema.js';
import { isValidEmail } from '$lib/utils.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API);

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
            const link = `https://grocerylistify.online/forgot-password/${id}/${token}`;
            console.log(link)

            const emailMsg = {
                to: usr[0].email,
                from: {
                    name: "Grocery Listify",
                    email: "olekkrzak2001@gmail.com"
                },
                subject: "Grocery Listify Password Reset",
                text: "Reset your password by clicking link below " + link,
                html: `<p> Reset your password by clicking link below: </p><br/><a href="${link}">Reset Password</a>`
            }

            try {
                sgMail.send(emailMsg);
            } catch (err) {
                console.log(err);
                return fail(500, {message: 'email failed to send'});
            }

            return {message: 'email sent'};
        }
	}
};