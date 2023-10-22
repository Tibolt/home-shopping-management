// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type JWTPayload = {
    name: string;
    email: string;
    id: number;
};

declare global {
	namespace App {
		interface Error {
			code: number,
			message: string,
		}
		interface Locals {
			authedUser: JWTPayload|undefined
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
