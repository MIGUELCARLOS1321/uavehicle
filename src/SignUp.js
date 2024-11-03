import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from './firebase/firebase';
import './SignUp.css';
import UAvehicle from './UAvehicle.png';
import UAlogo from './UAlogo.png';

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

      await setDoc(doc(db, "user", uid), {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="signup-container">
      <img src={UAvehicle} alt="UA Vehicle" className="signup-image" />
      <img src={UAlogo} alt="UA Logo" className="ua-logo2" />
      <div className="white-square">
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <div className="input-field">
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="input-field">
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <div className="input-field">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />
          </div>
          <div className="button-container1">
            <button className="back-btn" type="button" onClick={handleGoBack}>Go Back</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="signup-btn" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
