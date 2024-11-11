import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from './firebase/firebase';
import './SignUp.css';
import { Link } from 'react-router-dom'; // Add this line

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.endsWith('@ua.edu.ph') && !email.endsWith('@gmail.com')) {
      setErrorMessage('Please use a valid University or Gmail address.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        email,
        uid,
        createdAt: new Date(),
        registeredfor: '',
      });

      setErrorMessage('');
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google sign-up successful:', user);

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
          registeredfor: '',
        });

        console.log('New user created in Firestore');
      }

      setErrorMessage('');
      alert('Google Sign-Up successful!');
      navigate('/landing'); 
    } catch (error) {
      console.error('Error signing up with Google:', error);
      setErrorMessage('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <>
      <div className="signUpPage">
        <div className="pageContainer">
          <div className="pageIntro">
            <img src="UAlogo.png" alt="UA Logo" />
            <span>UAVEHICLE</span>
          </div>
          <div className="signUpForm">
            <div className="signUpHeader">
              <span style={{ fontSize: '2rem' }}>Create new Account</span>
              <span style={{ fontSize: '1rem' }}>
                Already Registered?&nbsp;
                <Link to="/login" style={{ color: '#004aad' }}>
                  Login
                </Link>
              </span>
            </div>
            <div className="formInput">
              {/* Email & Password Sign-Up */}
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>Please enter Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Please enter password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Re-enter password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="button-container1">
                  <button className="signup-btn" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>

              {/* Google Sign-In Button */}
              <div className="signupGoogle">
                <div className="signupGoogleHeader">Or Sign in using:</div>
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

export default SignUpPage;
