import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './LandingPage.css';

function LandingPage() {
  const [userEmail, setUserEmail] = useState(null);
  const [registeredfor, setRegisteredfor] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        const fetchRegistrationStatus = async () => {
          try {
            const userDoc = doc(db, "users", user.uid); // Using "users" collection
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              console.log("Fetched registeredfor:", userData.registeredfor); // Log the fetched value
              setRegisteredfor(userData.registeredfor || null);
            } else {
              setRegisteredfor(null);
              console.log("No registeredfor data found."); // Log if no data is found
            }
          } catch (error) {
            console.error("Error fetching registeredfor:", error);
            setRegisteredfor(null);
          }
        };

        fetchRegistrationStatus();
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, db]);

  useEffect(() => {
    console.log("Current registeredfor state:", registeredfor); // Log whenever registeredfor updates
  }, [registeredfor]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className='pageContainer'>
      <div className='leftContent'>
        <div className='topContainer'>
          <div className='logoHolder'><img src='/UAlogo.png' alt='UA Logo'></img></div>
          <span>UAVEHICLE</span>
        </div>
        <div className='bottomContainer'>
          <span>Logged in as: {userEmail || "Loading..."}</span>
          <button onClick={handleLogout} className="logoutButton1">Logout</button>
        </div>
      </div>
      <div className='rightContent'>
        <div className='topSection'>
          <div className='headerText'>Welcome to UAVEHICLE!</div>
        </div>
        <div className='midSection2'>
          {registeredfor === null ? (
            <>
              <button className='for4wheels' onClick={() => navigate('/vehicleregistration')}>
                <img src='/UAlogo.png' alt='UA Logo'></img>
                <div className='buttonText1' style={{backgroundColor:"blue"}}>Parking For 4 Wheeled Vehicles</div>
              </button>
              <button className='forpicndrop' onClick={() => navigate('/forpickndrop')}>
                <img src='/UAlogo.png' alt='UA Logo'></img>
                <div className='buttonText2' style={{backgroundColor:"red"}}>Pick and Drop Vehicles</div>
              </button>
              <button className='forservice' onClick={() => navigate('/forservice')}>
                <img src='/UAlogo.png' alt='UA Logo'></img>
                <div className='buttonText3' style={{backgroundColor:"yellow",color: "black"}}>Parking For Service Vehicles</div>
              </button>
              <button className='for2wheels' onClick={() => navigate('/fortwowheelvehicle')}>
                <img src='/UAlogo.png' alt='UA Logo'></img>
                <div className='buttonText4' style={{backgroundColor:"white", color: "black"}}>Parking For 2 Wheeled Vehicles</div>
              </button>
            </>
          ) : (
            <div className='registered'>
              <span>You are already registered for: {registeredfor}</span>
            </div>
          )}
        </div>
        <div className='footerSection2'>
          <div className='footerText2'>All rights reserved to the capstone project 2024-2025</div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
