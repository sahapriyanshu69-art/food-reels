import React, { useState } from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post(
                "https://food-reels-150l.onrender.com/api/auth/user/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.removeItem("foodPartner");

            navigate("/");

        } catch (err) {
            console.log(
                "Error response:",
                err.response?.data
            );

            const errorMessage =
                err.response?.data?.message ||
                "Login failed. Please try again.";

            setError(errorMessage);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div
                className="auth-card"
                role="region"
                aria-labelledby="user-login-title"
            >
                <header>
                    <h1
                        id="user-login-title"
                        className="auth-title"
                    >
                        Welcome back
                    </h1>

                    <p className="auth-subtitle">
                        Sign in to continue your food journey.
                    </p>
                </header>

                {error && (
                    <div
                        className="error-message"
                        style={{
                            color: "red",
                            marginBottom: "16px"
                        }}
                    >
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="field-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>

                <div className="auth-alt-action">
                    New here?{" "}
                    <Link to="/user/register">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;