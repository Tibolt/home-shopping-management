import type { ActionFailure, redirect, Actions, Action, RequestEvent } from "@sveltejs/kit";


const register: Action = async ({ request }) => {
    const data = await request.formData()
    const username = data.get('email')
    const password = data.get('password')
    const name = data.get('name')

    console.log({username, password})

}

export const actions: Actions = { register }