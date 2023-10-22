import type { Writable } from "svelte/store";
import { writable} from "svelte/store";

type JWTPayload = {
    name: string;
    email: string;
    id: number;
};

export const authToken:Writable<string|undefined> = writable(undefined);
export const user: Writable<JWTPayload|undefined> = writable(undefined)