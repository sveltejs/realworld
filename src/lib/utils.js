export async function post(endpoint, data) {
	const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}
