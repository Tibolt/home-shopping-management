import { db } from '$lib/db/config.js';
import { user } from '$lib/db/schema.js';
import { isValidEmail } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { unwrapFunctionStore, format } from 'svelte-i18n';

const $format = unwrapFunctionStore(format);

export const actions = {
	default: async ({event, request, params}) => {
		const { password, confirmPassword } = Object.fromEntries(await request.formData()) as {
            password: string;
            confirmPassword: string;
        };
        
        const usr = await db.select().from(user).where(eq(user.id, params.userId));
        if(usr.length == 0) return fail(400, {message: 'user not found' });

        const secret = process.env.JWT_SECRET + usr[0].password;
        
        try {
            jwt.verify(params.token, secret);
        }catch(err){
  
            return fail(400, {message: $format('tokenExpired')});
        }
        
        
        if(!password || !confirmPassword) return fail(400, {message: 'must provide password and confirmPassword' });

        if(password !== confirmPassword) return fail(400, {message: 'passwords do not match' });

        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(password?.toString(), salt);

        await db.update(user).set({password: hash}).where(eq(user.id, params.userId));

        throw redirect(301, "/login");
	}
};