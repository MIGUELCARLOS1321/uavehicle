import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import UAvehicle from './UAvehicle.png';
import './For2Vehicle.css';

const pb = new PocketBase('http://127.0.0.1:8090');

function For2Vehicle() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
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
    driverLicenseImage: null,
    ltoRegistrationImage: null,
    ltoReceiptImage: null,
    carImage: null,
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await pb.collection('For2WheelVehicle').create(data);
      console.log('Data saved:', response);
      setSuccessMessage('Thank you for signing up! Please proceed to the Physical Plant ang General Services Office for Confirmation and bring the physical copies.');

      // Reset form fields after submission
      setFormData({
        fullName: '',
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
        driverLicenseImage: null,
        ltoRegistrationImage: null,
        ltoReceiptImage: null,
        carImage: null,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      setSuccessMessage('An error occurred while saving your data.');
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
          <h2>For 2 / 3 Wheels Vehicle Information</h2>
          <form onSubmit={handleSubmit}>
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
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Honda">Honda</option>
                <option value="Kawasaki">Kawasaki</option>
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
                <option value="Van">Tricycle</option>
                <option value="Motorcycle">Motorcycle</option>
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
              <label>LTO Official Receipt Number *</label>
              <input
                type="text"
                name="receiptNumber"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Driver's License Image *</label>
              <input
                type="file"
                name="driverLicenseImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>LTO Registration Image *</label>
              <input
                type="file"
                name="ltoRegistrationImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>LTO Receipt Image *</label>
              <input
                type="file"
                name="ltoReceiptImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label>Vehicle Image *</label>
              <input
                type="file"
                name="carImage"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      )}

      {/* Button Container for Back and Logout */}
      <div className="button-container3">
        <button onClick={handleBack} className='button2'>Back</button>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </div>
  );
}

export default For2Vehicle;
