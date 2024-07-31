import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/${username}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const result = await response.json();
                setUser(result);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError(error.message);
            }
        };
        fetchUser();
    }, [username]);

    const handleEdit = () => {
        navigate(`/edit/${username}`);
    };

    return (
        <div>
            <h2>User Profile</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <div>
                    <p>Username: {user.user_name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;

