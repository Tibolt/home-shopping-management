export const load = async ({cookies}) => {
	// const log = cookies.get('log');
    const token = cookies.get("auth_token");
    let storageId = cookies.get("storageID");
    
    if(!token) {
       return {logged: false};
    }

    if(!storageId) {
        storageId="0"
    }
    
    const storageIdNum = parseInt(storageId)

    return {logged: true, storageId: storageIdNum};
}