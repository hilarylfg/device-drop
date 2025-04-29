import {Api} from "@/shared/services/api-client";

export async function verifyCodeLogic(code: string) {
    try {
        if (!code) {
            throw new Error('Неверный код');
        }

        return await Api.auth.verifyCode(code);
    } catch (err) {
        console.log('Error [VERIFY_CODE_LOGIC]', err);
        throw err;
    }
}