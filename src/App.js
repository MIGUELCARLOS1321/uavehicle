import React from 'react';
import logo from './UAarchives.png'; // Your main logo
import vehicleLogo from './UAvehicle.png'; // New image
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUpPage from './SignUp'; // Import your SignUpPage component
import LoginPage from './LoginPage'; // Import your LoginPage component
import LandingPage from './LandingPage'; // Import your LandingPage component
import ForStudents from './ForStudents'; // Import your ForStudents component
import ForFaculties from './ForFaculties'; // Import your ForFaculties component
import ForStaffs from './ForStaffs'; // Import your ForStaffs component
import For2Vehicle from './For2Vehicle';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div>
              <header className="App-header">
                <img src={vehicleLogo} className="Vehicle-logo" alt="vehicle logo" />
                <img src={logo} className="App-logo" alt="app logo" />
              </header>
              <div>
                <Link to="/signup">
                  <button className="sign-up-button">SIGN UP</button>
                </Link>
                <Link to="/login">
                  <button className="login-button">LOG IN</button>
                </Link>
              </div>
            </div>
          } />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/vehicleregistration" element={<ForStudents />} />
          <Route path="/forpickndrop" element={<ForFaculties />} />
          <Route path="/forservice" element={<ForStaffs />} />
          <Route path="/fortwowheelvehicle" element={<For2Vehicle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
