import React from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await axios.post(
      "https://food-reels-150l.onrender.com/api/auth/foodpartner/login",
      { email, password },
      
    );

    localStorage.setItem(
      "foodPartner",
      JSON.stringify(response.data.foodPartner)
    );

    navigate("/");

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <Link to="/foodpartner/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;