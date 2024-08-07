import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
    const { username } = useParams();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user data to prefill the form
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const user = await response.json();
                setFormData({ userName: user.user_name || '', email: user.email || '' });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/update_user/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('User updated successfully!');
                setTimeout(() => navigate(`/${formData.userName}`), 2000); // Redirect to updated user profile after 2 seconds
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Failed to update user');
        }
    };

    return (
        <div>
            <h2>Edit User Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUserProfile;
