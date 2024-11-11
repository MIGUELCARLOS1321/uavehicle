import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase/firebase'; 
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const auth = getAuth();
const provider = new GoogleAuthProvider();

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle Email and Password Login
  const handleLogin = async () => {
    console.log('Trying to log in with:', { email, password });

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      navigate('/landing', { replace: true });
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to log in. Please check your credentials.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google sign-in successful:', user);

      // Check if the user already exists in Firestore 'users' collection
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      // If the user doesn't exist, create a new document with the user data
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          createdAt: new Date(),
          email: user.email,
          registeredfor: "", // Empty string initially
          uid: user.uid,
        });

        console.log('New user created in Firestore');
      }

      // Navigate to the landing page after successful sign-in
      navigate('/landing', { replace: true });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setErrorMessage('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <>
      <div className="logInPage">
        <div className="pageContainer">
          <div className="pageIntro">
            <img src="UAlogo.png" alt="UA Logo" />
            <span>UAVEHICLE</span>
          </div>
          <div className="logInForm">
            <div className="logInHeader">
              <span style={{ fontSize: '2rem' }}>Login</span>
              <span style={{ fontSize: '1rem' }}>
                Don&apos;t have an account?&nbsp;
                <Link to="/" style={{ color: '#004aad' }}>
                  Register
                </Link>
              </span>
            </div>
            <div className="formInput">
              {/* Email and Password Fields */}
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
                <button className="log-in-button" onClick={handleLogin}>
                  Login
                </button>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              {/* Google Sign-In Button */}
              <div className="signinGoogle">
                <div className="signinGoogleHeader">Sign in Using:</div>
                <button className="googleImage" onClick={handleGoogleSignIn}>
                  <img src="/google.png" alt="Google" />
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
