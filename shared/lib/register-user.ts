const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5295';

export async function registerUser(body: { firstName: string; email: string; password: string }) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Не удалось зарегистрировать пользователя');
        }

        return await response.json();
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}