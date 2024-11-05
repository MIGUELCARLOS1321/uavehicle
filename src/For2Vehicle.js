import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase/firebase'; 
import { setDoc, doc } from 'firebase/firestore';
import UAvehicle from './UAvehicle.png';
import { getAuth } from 'firebase/auth';
import './For2Vehicle.css';

function For2Vehicle() {
  const navigate = useNavigate();
  const auth = getAuth();
  const userUid = auth.currentUser?.uid;

  const [consent, setConsent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    studentNumber: '',
    address: '',
    contactNumber: '',
    licenseNumber: '',
    expiryDate: '',
    vehicleBrand: '',
    vehicleType: '',
    vehicleColor: '',
    registeredOwner: '',
    plateNumber: '',
    registrationNumber: '',
    receiptNumber: '',
    driverLicenseImage: '',
    ltoRegistrationImage: '',
    ltoReceiptImage: '',
    carImage: '',
    role: '', 
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleConsentChange = (e) => {
    setConsent(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result, // Store the Base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userUid) {
      setSuccessMessage('You must be logged in to submit this form.');
      return; // Prevent submission if user is not logged in
    }
  
    try {
      // Create a new document in the 'parkingservice' collection
      const parkingRef = doc(db, 'parkingtwovehicle', userUid);
      await setDoc(parkingRef, {
        ...formData,
      });
  
      // Update the 'registeredfor' field in the user collection
      const userRef = doc(db, 'user', userUid);
      await setDoc(userRef, {
        registeredfor: 'parkingtwovehicle',
      }, { merge: true }); // Use merge option to update fields without overwriting
  
      console.log('Data saved successfully');
      setSuccessMessage('Thank you for signing up! Please proceed to the Physical Plant and General Services Office for Confirmation and bring the physical copies.');
  
      // Reset form fields after submission
      setFormData({
        fullName: '',
        studentNumber: '',
        address: '',
        contactNumber: '',
        licenseNumber: '',
        expiryDate: '',
        vehicleBrand: '',
        vehicleType: '',
        vehicleColor: '',
        registeredOwner: '',
        plateNumber: '',
        registrationNumber: '',
        receiptNumber: '',
        driverLicenseImage: '',
        ltoRegistrationImage: '',
        ltoReceiptImage: '',
        carImage: '',
        role: '',
      });
    } catch (error) {
      console.error('Error saving data:', error);
      setSuccessMessage('An error occurred while saving your data. Please try again.');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="for-students-container">
      <img src={UAvehicle} alt="UA Vehicle" className="logo-header" />
      <div className="data-privacy-container">
        <h2>Data Privacy Statement</h2>
        <p>
          In accordance with the Data Privacy Act of 2012, the University of the Assumption is committed to maintaining the confidentiality of the data that you provide for us. We collect, store, and retain personal data when reasonable and necessary to perform our services effectively, safely, and efficiently. By responding, "Yes" to this question, you consent to the collection, storage, and retention of your personal data.
        </p>
        <div className="consent-options">
          <label>
            <input
              type="radio"
              value="yes"
              checked={consent === 'yes'}
              onChange={handleConsentChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={consent === 'no'}
              onChange={handleConsentChange}
            />
            No
          </label>
        </div>
      </div>

      {consent === 'yes' && (
        <div className="student-form-container">
          <h2>2 Wheels Information</h2>
          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="form-group">
              <label>Role *</label>
              <select name="role" required onChange={handleInputChange}>
                <option value="">Select...</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Existing Fields */}
            <div className="form-group">
              <label>Full Name of Applicant (Surname, First Name, MI) *</label>
              <input
                type="text"
                name="fullName"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>10-Digit UA ID Number *</label>
              <input
                type="text"
                name="studentNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Contact Number *</label>
              <input
                type="text"
                name="contactNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Driver's License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date of License *</label>
              <input
                type="date"
                name="expiryDate"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Brand of Vehicle *</label>
              <select
                name="vehicleBrand"
                required
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="Honda">Honda</option>
                <option value="Kawasaki">Kawasaki</option>
                <option value="BMW">BMW</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type of Vehicle *</label>
              <select
                name="vehicleType"
                required
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Tricycle">Tricycle</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Color of Vehicle *</label>
              <select
                name="vehicleColor"
                required
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Silver">Silver</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Orange">Orange</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Registered Owner of Vehicle *</label>
              <input
                type="text"
                name="registeredOwner"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Plate Number *</label>
              <input
                type="text"
                name="plateNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>LTO Certification of Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Receipt Number *</label>
              <input
                type="text"
                name="receiptNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Upload Driver's License Image *</label>
              <input
                type="file"
                name="driverLicenseImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Upload LTO Registration Image *</label>
              <input
                type="file"
                name="ltoRegistrationImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Upload LTO Receipt Image *</label>
              <input
                type="file"
                name="ltoReceiptImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Upload Vehicle Image *</label>
              <input
                type="file"
                name="carImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      )}

  <div className="button-container3">
        <button onClick={handleBack} className='button2'>Back</button>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </div>
  );
}

export default For2Vehicle;
