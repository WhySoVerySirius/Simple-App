export default async function loginAttempt(loginData) {
    const response = await fetch(
        'http://localhost/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
    if (!response.ok) {
        return await response.err
    }
    return await response.json()
}