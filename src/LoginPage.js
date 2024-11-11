import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './LoginPage.css';
import { Link } from 'react-router-dom';

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
    <>
      <div className="logInPage">
        <div className='pageContainer'>
          <div className='pageIntro'>
            <img src="UAlogo.png" alt="UA Logo" />
            <span>UAVEHICLE</span>
          </div>
          <div className='logInForm'>
            <div className='logInHeader'>
              <span style={{fontSize: "2rem"}}>Login</span>
              <span style={{fontSize: "1rem"}}>
                Dont have an account?&nbsp;  
                <Link to="/" style={{ color: "#004aad"}}>
                  Register
                </Link>
              </span>
            </div>
            <div className='formInput'>
                <div className="input-field">
                  <label>Please enter Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <label>Please enter password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button-container">
                  <button className="log-in-button" onClick={handleLogin}>Login</button>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="signinGoogle">
                  <div className="signinGoogleHeader">Signin Using:</div>
                    <button className='googleImage'>
                    <img src='/google.png' alt="Google" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
