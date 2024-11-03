import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignUp.css'; // Import a CSS file for styling
import UAvehicle from './UAvehicle.png'; // Import the vehicle image
import UAlogo from './UAlogo.png'; // Import the UA logo image
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function SignUpPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Email validation to check if it ends with "@ua.edu.ph" or "@gmail.com"
    if (!email.endsWith('@ua.edu.ph') && !email.endsWith('@gmail.com')) {
      alert('Please use an email from the University of the Assumption or a Gmail address.');
      return; // Stop further execution if the email is invalid
    }

    // Check for password mismatch
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return; // Stop further execution if passwords don't match
    }

    try {
      // Check if the email is already in use
      const existingUsers = await pb.collection('custom_users').getList(1, 1, {
        filter: `(email = "${email}")`
      });

      if (existingUsers.items.length > 0) {
        alert('Email already exists. Please try again with a different email.');
        return; // Stop further execution if a duplicate is found
      }

      // If no duplicates, proceed with signup
      const userData = {
        email,
        password,
      };

      await pb.collection('custom_users').create(userData);
      alert('Signup successful!');

      // Navigate to the login page
      navigate('/login'); // Adjust the path as needed
    } catch (error) {
      console.error('Error signing up:', error);

      // Check if the error has a message or details
      if (error.message) {
        alert(`Signup failed: ${error.message}`);
      } else {
        alert('Signup failed. Please try again.');
      }

      // Log full error details if available
      console.error('Full error details:', error);
    }
  };

  // Handle the Go Back button click
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
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
