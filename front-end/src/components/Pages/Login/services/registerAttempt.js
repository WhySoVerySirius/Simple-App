export default async function registerAttempt(registerData) {
    const response = await fetch(
        'http://localhost/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        }
    );
    if (!response.ok) {
        return await response.error
    }
    return await response.json();
}