import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from './firebase/firebase';
import './SignUp.css';
import { Link } from 'react-router-dom'; // Add this line

const auth = getAuth(app);
const db = getFirestore(app);

function SignUpPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!email.endsWith('@ua.edu.ph') && !email.endsWith('@gmail.com')) {
      alert('Please use a valid University or Gmail address.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        uid,
        createdAt: new Date(),
        registeredfor:''
      });

      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <>
      <div className="signUpPage">
        <div className='pageContainer'>
          <div className='pageIntro'>
            <img src="UAlogo.png" alt="UA Logo" />
            <span>UAVEHICLE</span>
          </div>
          <div className='signUpForm'>
            <div className='signUpHeader'>
              <span style={{fontSize: "2rem"}}>Create new Account</span>
              <span style={{fontSize: "1rem"}}>
                Already Registered?&nbsp;  
                <Link to="/login" style={{ color: "#004aad"}}>
                  Login
                </Link>
              </span>
            </div>
            <div className='formInput'>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>Please enter Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="input-field">
                  <label>Please enter password</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <div className="input-field">
                  <label>Re-enter password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />
                </div>
                <div className="button-container1">
                  <button className="signup-btn" type="submit">Sign Up</button>
                </div>
              </form>
              <div className="signupGoogle">
                <div className="signupGoogleHeader">SignUp Using:</div>
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

export default SignUpPage;
