import {Api} from "@/shared/services/api-client";

export async function registerUser(body: { firstName: string; email: string; password: string }) {
    try {
        const { message } = await Api.auth.register(body.firstName, body.email, body.password)
        return message;
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}