import fetch from 'node-fetch';

const runTest = async () => {
    const url = 'http://localhost:8080/api/createUser';
    const payload = {
        userName: 'testuser',
        userPassword: 'password123',
        email: 'testuser@example.com'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Response data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

runTest();

