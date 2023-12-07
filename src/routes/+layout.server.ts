import { db } from '$lib/db/config.js';
import { storage, user_storage } from '$lib/db/schema.js';
import { cookieJwtAuth } from '$lib/server/jwt.js';
import { desc, eq } from 'drizzle-orm';

export const load = async ({cookies}) => {
	// const log = cookies.get('log');
    const token = cookies.get("auth_token");
    let storageId = cookies.get("storageID");
    
    if(!token) {
       return {logged: false};
    }
    
    if(!storageId) {
        const userPayload = await cookieJwtAuth(token);
        let userStores = await db.select({id: storage.id}).where(eq(user_storage.user_id, userPayload.id)).orderBy(desc(storage.author))
        storageId = userStores[0].id
    }
    
    const storageIdNum = parseInt(storageId)

    return {logged: true, storageId: storageIdNum};
}