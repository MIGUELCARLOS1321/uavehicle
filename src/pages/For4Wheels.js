import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; 
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import './For4Wheels.css';
import 'font-awesome/css/font-awesome.min.css';

function For4Wheels() {

    const navigate = useNavigate();
    const auth = getAuth();

    const [userUid, setUserUid] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [privacyConsent, setPrivacyConsent] = useState(''); // Track consent
    const [currentStep, setCurrentStep] = useState(1); // Track the current step
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid); // Set user UID when authenticated
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    // Go to next step
    const goToNextStep = () => {
        if (privacyConsent === 'yes' && currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Go to previous step
    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate('/landing'); 
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Update the formData for the individual field
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
    
            // Concatenate Full Name
            const { surname, firstName, middleInitial, suffix } = updatedData;
            const fullName = `${surname || ''}, ${firstName || ''} ${middleInitial ? middleInitial + ' ' : ''}${suffix || ''}`.trim();
    
            // Concatenate Address
            const { addressline, city, province } = updatedData;
            const address = `${addressline ? addressline + ', ' : ''}${city ? city + ', ' : ''}${province || ''}`.trim();
    
            // Update fullName and address fields in formData
            return {
                ...updatedData,
                fullName: fullName,
                address: address,
            };
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
    
        setIsSubmitting(true); 
    
        try {
            const parkingRef = doc(db, 'parkingfourwheel', userUid);
            await setDoc(parkingRef, { ...formData });
    
            const userRef = doc(db, 'users', userUid);
            await setDoc(userRef, {
                registeredfor: 'parkingfourwheel',
            }, { merge: true }); 
    
            console.log('Data saved successfully');
            setSuccessMessage('Thank you for signing up! Please proceed to the Physical Plant and General Services Office for Confirmation and bring the physical copies.');
    
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
    
            navigate("/landing"); 
        } catch (error) {
            console.error('Error saving data:', error);
            setSuccessMessage('An error occurred while saving your data.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
      
    return (
        <div className='pageContainer'>
            <button onClick={handleLogout} className="logoutButton">Logout</button>
            <div className='leftContent'>
                <div className='topContainer'>
                    <div className='logoHolder'>
                        <img src='/UAlogo.png' alt='UA Logo' />
                    </div>
                    <span>UAVEHICLE</span>
                </div>
                <div className='bottomContainer'>
                    <span>Logged in as: {userEmail || "Loading..."}</span>
                </div>
            </div>
            <div className='rightContent'>
                <div className='topSection'>
                    <div className='headerText'>Parking For 4 Wheeled Vehicles</div>
                </div>
                <div className='midSection'>
                    {currentStep === 1 && (
                        <div>
                            <center>
                                Terms and Conditions
                            </center>
                            <br />
                            I am applying for a vehicle sticker to enter the premises of the University of the Assumption to PARK my vehicle. In consideration of the University approving my application, I undertake to comply with the following guidelines of the University:
                            <br />
                            <br />
                            1. The car sticker shall be permanently installed and conspicuously displayed on the vehicle’s windshield.
                            <br />
                            2. The car sticker is non-transferrable.
                            <br />
                            3. All vehicle owners who are issued vehicle stickers should obey the vehicle policies and traffic rules and regulations imposed by the University at all times .
                            <br />
                            4. The volume of music emanating from vehicles inside the University’s premises should be kept low so as not to cause vexation to the school community or disturbance to on-going classes or activities.
                            <br />
                            5. For safety reasons, the University reserves the right to have Security Guards make searches on the vehicles, as the exigencies require and as authorized by the school authorities.
                            <br />
                            6. For motorcycle riders, the “No HELMET, No Entrance” policy shall be strictly enforced.
                            <br />
                            <br />
                            Moreover, I understand and acknowledge that:
                            <br />
                            (1) Failure to obey any of the above-mentioned guidelines would mean revocation of the vehicle pass.
                            <br />
                            (2) The University reserves the right to determine the use of the parking area at any given time. Hence, it may designate a “no parking” or “reserved parking” zone as may be appropriate and necessary in its sole discretion.
                            <br />
                            (3) I am utilizing the parking facilities of the University of my own accord.
                            <br />
                            (4) The University is under no obligation either to take care and/or protect my vehicle or provide insurance for it. I, therefore, undertake to secure my belongings and valuables, and free the University from any responsibility or liability for any loss or damage to the vehicles parked in the University’s parking facilities, as well as to my personal belongings and valuables inside the vehicles.
                            <br />
                            <br />
                            <br />

                            <center>Data Privacy Statement</center>
                            <br />
                            <p>
                                In accordance with the Data Privacy Act of 2012, the University of the Assumption is committed to maintaining the confidentiality of the data that you provide for us. We collect, store, and retain personal data when reasonable and necessary to perform our services effectively, safely, and efficiently. By responding, "Yes" to this question, you consent to the collection, storage, and retention of your personal data.
                            </p>
                            <div className='radioButton'>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="dataPrivacy" 
                                        value="yes" 
                                        checked={privacyConsent === 'yes'}
                                        onChange={() => setPrivacyConsent('yes')} 
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="dataPrivacy" 
                                        value="no" 
                                        checked={privacyConsent === 'no'}
                                        onChange={() => setPrivacyConsent('no')} 
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className='student-form'>
                            <form onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" required onChange={handleInputChange}>
                                    <option value="">Select...</option>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {/* Existing Fields */}
                            <div className='name-form-group'>
                                <div className="form-group">
                                    <label>Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>M.I.</label>
                                    <input
                                        type="text"
                                        name="middleInitial"
                                        maxLength="1" 
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Suffix</label>
                                    <input
                                        type="text"
                                        name="suffix"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>10-Digit UA ID Number</label>
                            <input
                                type="text"
                                name="studentNumber"
                                required
                                maxLength="10"
                                pattern="\d{10}"
                                title="Please input a valid 10-Digit UA Number"
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                                <label>Address Line</label>
                                <input
                                    type="text"
                                    name="addressline"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='address-form-group'>
                                <div className="form-group">
                                    <label>Province</label>
                                    <input
                                        type="text"
                                        name="province"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                            <label>Driver's License Number</label>
                            <input
                                type="text"
                                name="licenseNumber"
                                required
                                pattern="[A-Z]{1}\d{2}-\d{2}-\d{6}" 
                                style={{ textTransform: 'uppercase' }}
                                title="Please enter in format: A12-34-567890" 
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Expiry Date of License</label>
                            <input
                                type="date"
                                name="expiryDate"
                                required
                                min={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                                title="Please select a date at least one year from today."
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Brand of Vehicle</label>
                            <select
                                name="vehicleBrand"
                                required
                                onChange={handleInputChange}
                            >
                                <option value="">Select...</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Nissan">Nissan</option>
                                <option value="Mitsubishi">Mitsubishi</option>
                                <option value="Honda">Honda</option>
                                <option value="Isuzu">Isuzu</option>
                                <option value="Ford">Ford</option>
                                <option value="Other">Other</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label>Type of Vehicle</label>
                            <select
                                name="vehicleType"
                                required
                                onChange={handleInputChange}
                            >
                                <option value="">Select...</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Pick-up">Pick-up</option>
                                <option value="SUV">SUV (Sports Utility Vehicle)</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Crossover">Crossover</option>
                                <option value="Van">Van</option>
                                <option value="Other">Other</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label>Color of Vehicle</label>
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
                            <label>Registered Owner of Vehicle</label>
                            <input
                                type="text"
                                name="registeredOwner"
                                required
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Plate Number</label>
                            <input
                                type="text"
                                name="plateNumber"
                                required
                                maxLength="7" 
                                pattern="[A-Za-z]{1,3}[0-9]{1,4}" 
                                title="Please enter a valid plate number (e.g., ABC1234)"
                                onChange={(e) => {
                                const value = e.target.value.replace(/\s+/g, '').toUpperCase(); 
                                setFormData({
                                    ...formData,
                                    plateNumber: value,
                                });
                                }}
                            />
                            </div>
                            <div className="form-group">
                            <label>LTO Certification of Registration Number</label>
                            <input
                                type="text"
                                name="registrationNumber"
                                required
                                maxLength="20" 
                                pattern="\d{10,20}" // Accepts 10 to 20 digits only
                                title="Must be 10-20 digits"
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Receipt Number</label>
                            <input
                                type="text"
                                name="receiptNumber"
                                required
                                maxLength="20"
                                pattern="\d{10,20}" // Accepts 10 to 20 digits only
                                title="Must be 10-20 digits"
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Upload Driver's License Image</label>
                            <input
                                type="file"
                                name="driverLicenseImage"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Upload LTO Registration Image</label>
                            <input
                                type="file"
                                name="ltoRegistrationImage"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Upload LTO Receipt Image</label>
                            <input
                                type="file"
                                name="ltoReceiptImage"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Upload Vehicle Image</label>
                            <input
                                type="file"
                                name="carImage"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                            />
                            </div>

                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? "Submit" : "Submit"}
                            </button>
                        </form>
                        </div>
                    )}

                </div>
                <div className='footerSection'>
                    <button 
                        onClick={goToPreviousStep} 
                        disabled={currentStep === ''} 
                        className='leftButton'
                    >
                        <FontAwesomeIcon icon={faLeftLong} />
                    </button>
                    <button 
                        onClick={goToNextStep} 
                        disabled={privacyConsent !== 'yes' || currentStep === 2} 
                        className='rightButton'
                    >
                        <FontAwesomeIcon icon={faRightLong} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default For4Wheels;
