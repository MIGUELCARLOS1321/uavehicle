import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Blue from './Blue.png'; 
import Red from './Red.png'; 
import Yellow from './Yellow.png';
import White from './White.png'; // Import the new image
import UAvehicle from './UAvehicle.png';

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle navigation to ForStudents.js
  const handleForStudents = () => {
    navigate('/forstudents'); // The path should match your route configuration
  };

  // Function to handle navigation to ForFaculties.js
  const handleForFaculties = () => {
    navigate('/forfaculties'); // The path should match your route configuration
  };

  // Function to handle navigation to ForStaffs.js
  const handleForStaffs = () => {
    navigate('/forstaffs'); // The path should match your route configuration
  };

  // Function to handle navigation to For23Wheels.js
  const handleFor23Wheels = () => {
    navigate('/for2vehicle'); // The path should match your route configuration
  };

  // Function to handle logout and navigate back to the App.js page
  const handleLogout = () => {
    navigate('/'); // Redirects to the App.js page (home page)
  };

  return (
    <div className="backgroundcolor">
      <div className='header-landing'>
        <button className="logout-button1" onClick={handleLogout}>Logout</button> {/* Moved inside header */}
      </div>
      <div className="landing-container">
        <img src={UAvehicle} alt="UA Vehicle" className="logo-on-top" />
        <div className="image-row">
          <div className="image-button-group">
            <img src={Blue} alt="Student" />
            <button className="button" onClick={handleForStudents}>For 4 Wheels Vehicle</button> {/* Handle For Students navigation */}
          </div>
          <div className="image-button-group">
            <img src={Red} alt="Faculty" />
            <button className="button" onClick={handleForFaculties}>For Pick & Drop</button> {/* Handle For Faculties navigation */}
          </div>
          <div className="image-button-group">
            <img src={Yellow} alt="Staff" />
            <button className="button" onClick={handleForStaffs}>For Service</button> {/* Handle For Staffs navigation */}
          </div>
          <div className="image-button-group">
            <img src={White} alt="New Option" />
            <button className="button" onClick={handleFor23Wheels}>For 2 Wheels / 3 Wheels Vehicle</button> {/* Handle For 2/3 Wheels navigation */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
