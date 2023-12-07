import { sequence } from '@sveltejs/kit/hooks';
import jwt from "jsonwebtoken";
import { cookieJwtAuth } from '$lib/server/jwt';

async function firstHandle ({event, resolve}) {
    const token = event.cookies.get("auth_token")
    try {
        if(!token) event.locals.authedUser = undefined;

        const claims = jwt.verify(token, process.env.JWT_SECRET)
        if(!claims) event.locals.authedUser = undefined;

        if(token && claims){
            // conect to db

            // find user
            event.locals.authedUser = cookieJwtAuth(token)

        }
    }
    finally{
        const response = await resolve(event);
        return response;
    }
}

async function secondHandle({event, resolve}) {
    if(!event.locals.authedUser){
        const refreshToken = event.cookies.get('refresh_token');
        try{
            if(!refreshToken) event.locals.authedUser = undefined;
    
            const claims = jwt.verify(refreshToken, process.env.JWT_SECRET);
            if(!claims) event.locals.authedUser = undefined;
    
            if(refreshToken && claims){
                // conect to db

                // find user
                const user = cookieJwtAuth(refreshToken)
                event.locals.authedUser = user
                const authToken = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"1h"});
                event.cookies.set('auth_token',authToken,{httpOnly: true,maxAge:60 * 60 * 24,sameSite: 'strict'});
    
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

    