const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5295';

export async function verifyCodeLogic(code: string) {
    try {
        if (!code) {
            throw new Error('Неверный код');
        }

        const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Не удалось подтвердить код');
        }

        return await response.json();
    } catch (err) {
        console.log('Error [VERIFY_CODE_LOGIC]', err);
        throw err;
    }
}