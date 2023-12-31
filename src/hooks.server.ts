import { sequence } from '@sveltejs/kit/hooks';
import jwt from "jsonwebtoken";
import { cookieJwtAuth, cookieJwtCreate } from '$lib/server/jwt';
import { db } from '$lib/db/config';
import { eq } from 'drizzle-orm';
import { user } from "$lib/db/schema";
import { locale } from 'svelte-i18n'

async function firstHandle ({event, resolve}) {
    const lang = event.request.headers.get('accept-language')?.split(',')[0]
	if (lang) {
		locale.set(lang)
	}

    if (event.url.pathname.startsWith('/forgot-password')) {
		return await resolve(event);
	}
    if (event.url.pathname.startsWith('/login')) {
        return await resolve(event);
    }
    if (event.url.pathname.startsWith('/register')) {
        return await resolve(event);
    }

    const token = event.cookies.get("auth_token")
    try {
        if(!token) event.locals.authedUser = undefined;

        const claims = await cookieJwtAuth(token)
        if(!claims) event.locals.authedUser = undefined;

        if(token && claims){
            
            const usr = await db.select().from(user).where(eq(user.id, claims.id))
            const {password, ...userMinusPass} = usr[0]
            event.locals.authedUser = userMinusPass     
        }
    }
    finally{
        const response = await resolve(event);
        return response;
    }
}

async function secondHandle({event, resolve}) {
    if (event.url.pathname.startsWith('/forgot-password')) {
		return await resolve(event);
	}
    if (event.url.pathname.startsWith('/login')) {
        return await resolve(event);
    }
    if (event.url.pathname.startsWith('/register')) {
        return await resolve(event);
    }

    if(!event.locals.authedUser){
        const refreshToken = event.cookies.get('refresh_token');
        try{
            if(!refreshToken) event.locals.authedUser = undefined;
    
            const claims = await cookieJwtAuth(refreshToken)
            if(!claims) event.locals.authedUser = undefined;
    
            if(refreshToken && claims){
                // find user in db
                const usr = await db.select().from(user).where(eq(user.id, claims.id))
                const {password, ...userMinusPass} = usr[0]
                event.locals.authedUser = userMinusPass

                const authToken = await cookieJwtCreate(userMinusPass)
                event.cookies.set('auth_token',authToken,{httpOnly: true,maxAge:60 * 60 * 2,sameSite: 'strict'});
            }
        }
        finally{
            const response = await resolve(event);
            return response;
        }

    }
    if(event.locals){
        const response = await resolve(event);
        return response;
    }
}

export const handle = sequence(firstHandle, secondHandle);

    