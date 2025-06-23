export const BASE_URL = 'http://localhost:8080';

// --- GET PRODUCT LIST ---
export async function getProducts() {
    const res = await fetch(`${BASE_URL}/product`, {
        method: 'GET',
        headers: {
        },
        credentials: 'include'
    });

    if (!res.ok) {
        throw new Error('Failed to load products');
    }

    return res.json();
}

// --- CREATE PRODUCT ---
export async function createProduct(data) {
    const res = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to create product');
    }

    return await res.text();
}

export async function login(username, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',   // Bắt buộc để lưu cookie session
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error('Invalid username or password');
    }

    return await res.text();
}
