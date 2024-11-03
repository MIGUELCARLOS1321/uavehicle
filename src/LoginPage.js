import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './LoginPage.css';
import UAlogo from './UAlogo.png';
import UAvehicle from './UAvehicle.png';

const auth = getAuth();

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);

      // Navigate to the landing page if login is successful
      navigate('/landing', { replace: true });
    } catch (error) {
      console.error('Error logging in:', error);
      // Display a relevant error message to the user
      setErrorMessage('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="Login-page">
      <img src={UAvehicle} alt="UA Vehicle" className="logo" />
      <div className="white-square">
        <img src={UAlogo} alt="UA Logo" className="logo ua-logo3" style={{ marginTop: -50 }} />
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
