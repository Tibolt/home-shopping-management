export async function load({ cookies }) {
	// const log = cookies.get('log');
    const token = cookies.get("auth_token");
    
    if(!token) {
       return {logged: false};
    }
    return {logged: true};
}