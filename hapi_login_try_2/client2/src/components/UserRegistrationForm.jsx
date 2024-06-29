import React, { useState } from 'react';
import '../App.css'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';


const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
        setMessage('User created successfully!');
        setFormData({ userName: '', userPassword: '', email: '' }); // Reset form data
    } else {
        setMessage(result.error || 'Failed to create user');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="center-container">
      <div className="center-content">
        <h2>Register User</h2>
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
            <label>Password:</label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
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
          <button type="submit">Register</button>
          <button type="button" onClick={handleBack}>Back</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UserRegistrationForm;
