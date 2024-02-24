import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/loginregister.ts'; // Your API request function

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Registration: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await registerUser(formData); // API request to register user
            navigate('/login'); // Redirect to main page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration error
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link>.</p>
            </form>
        </div>
    );
}

export default Registration;