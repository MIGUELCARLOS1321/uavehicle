import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import UAlogo from './UAlogo.png';
import UAvehicle from './UAvehicle.png';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Trying to log in with:', { email, password });

    // Validate if email and password fields are not empty
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      // Fetch user record from the PocketBase collection based on email
      const result = await pb.collection('custom_users').getFirstListItem(`email="${email}"`);

      // Check if the password matches the user's password
      if (result && result.password === password) {
        console.log('Login successful');
        navigate('/landing', { replace: true }); // Navigate to the LandingPage if login is successful
      } else {
        setErrorMessage('Incorrect email or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="Login-page">
      <img src={UAvehicle} alt="UA Vehicle" className="logo" />\
      <img src={UAlogo} alt="UA Logo" className="logo ua-logo3" style={{ marginTop: -50 }} />
      <div className="white-square">
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button container for Login and Go Back */}
        <div className="button-container">
          <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="log-in-button" onClick={handleLogin}>Log In</button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
