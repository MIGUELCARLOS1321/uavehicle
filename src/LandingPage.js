import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import './LandingPage.css';
import Blue from './Blue.png'; 
import Red from './Red.png'; 
import Yellow from './Yellow.png';
import White from './White.png'; 
import UAvehicle from './UAvehicle.png';

function LandingPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="backgroundcolor">
      <div className='header-landing'>
        <button className="logout-button1" onClick={handleLogout}>Logout</button>
      </div>
      <div className="landing-container">
        <img src={UAvehicle} alt="UA Vehicle" className="logo-on-top" />
        <div className="image-row">
          <div className="image-button-group">
            <img src={Blue} alt="Student" />
            <button className="button" onClick={() => navigate('/vehicleregistration')}>For 4 Wheels Vehicle</button>
          </div>
          <div className="image-button-group">
            <img src={Red} alt="Faculty" />
            <button className="button" onClick={() => navigate('/forfaculties')}>For Pick & Drop</button>
          </div>
          <div className="image-button-group">
            <img src={Yellow} alt="Staff" />
            <button className="button" onClick={() => navigate('/forstaffs')}>For Service</button>
          </div>
          <div className="image-button-group">
            <img src={White} alt="New Option" />
            <button className="button" onClick={() => navigate('/for2vehicle')}>For 2 Wheels / 3 Wheels Vehicle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
