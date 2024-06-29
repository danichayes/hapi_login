// src/components/HomeScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1>Welcome to DC Postgrad Work Login</h1>
            <button onClick={() => navigateTo('/register')} style={{ margin: '10px', padding: '10px 20px' }}>
                Register
            </button>
            <button onClick={() => navigateTo('/login')} style={{ margin: '10px', padding: '10px 20px' }}>
                Login
            </button>
        </div>
    );
};

export default HomeScreen;
