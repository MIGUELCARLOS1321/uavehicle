import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase'; 
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import './For4Wheels.css';
import 'font-awesome/css/font-awesome.min.css';

function For2Wheels() {

    const navigate = useNavigate();
    const auth = getAuth();

    const [userUid, setUserUid] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [privacyConsent, setPrivacyConsent] = useState(''); 
    const [currentStep, setCurrentStep] = useState(1); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
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
        driverLicenseImage: '',
        ltoRegistrationImage: '',
        ltoReceiptImage: '',
        carImage: '',
        role: '', 
        ltoReceiptNumber: '',
        receiptNumber: '',
        receiptImage: '',
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
    
            const { addressline, municipality, province } = updatedData;
            const address = `${addressline ? addressline + ', ' : ''}${municipality ? municipality + ', ' : ''}${province || ''}`.trim();
    
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
            // Create a new document in the 'parkingfourwheel' collection
            const parkingRef = doc(db, 'parkingtwovehicle', userUid);
            await setDoc(parkingRef, {
                ...formData,
            });
    
            // Update the 'registeredfor' field in the user collection
            const userRef = doc(db, 'users', userUid);
            await setDoc(userRef, {
                registeredfor: 'parkingtwovehicle',
            }, { merge: true }); // merge for overwriting
    
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
                driverLicenseImage: '',
                ltoRegistrationImage: '',
                ltoReceiptImage: '',
                carImage: '',
                role: '',
                ltoReceiptNumber: '',
                receiptNumber: '',
                receiptImage: '',
            });

            navigate("/landing"); 
        } catch (error) {
            console.error('Error saving data:', error);
            setSuccessMessage('An error occurred while saving your data.');
        } finally{
            setIsSubmitting(false);
        }
    };
    
      
    return (
        <div className='pageContainer'>
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
                    <div className='headerText'>Parking For 2 Wheeled Vehicles</div>
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
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Suffix</label>
                                    <select>
                                        name="suffix"
                                        placeholder=""
                                        onChange={handleInputChange}
                                        <option value="">N/A</option>
                                        <option value="Jr.">Jr.</option>
                                        <option value="Sr.">Sr.</option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                    </select>
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
                                    <select 
                                        name="province"
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option value="Pampanga">Pampanga</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Municipality</label>
                                    <select name="municipality" required onChange={handleInputChange}>
                                        <option value=""></option>
                                        <option value="Apalit">Apalit</option>
                                        <option value="Bacolor">Bacolor</option>
                                        <option value="Candaba">Candaba</option>
                                        <option value="Floridablanca">Floridablanca</option>
                                        <option value="Guagua">Guagua</option>
                                        <option value="Lubao">Lubao</option>
                                        <option value="Macabebe">Macabebe</option>
                                        <option value="Magalang">Magalang</option>
                                        <option value="Mabalacat">Mabalacat</option>
                                        <option value="Manalapan">Manalapan</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Minalin">Minalin</option>
                                        <option value="Porac">Porac</option>
                                        <option value="San Fernando">San Fernando</option>
                                        <option value="San Luis">San Luis</option>
                                        <option value="San Simon">San Simon</option>
                                        <option value="Santa Ana">Santa Ana</option>
                                        <option value="Santa Rita">Santa Rita</option>
                                        <option value="Santo Tomas">Santo Tomas</option>
                                        <option value="Sasmuan">Sasmuan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Contact Number (63+)</label>
                                <div className='contactHolder'>
                                    <div className='digit'>
                                        63+
                                    </div>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        maxLength="10"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
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
                                <label>LTO Receipt Number</label>
                                <input
                                    type="text"
                                    name="ltoReceiptNumber"
                                    required
                                    maxLength="20"
                                    pattern="\d{10,20}" // Accepts 10 to 20 digits only
                                    title="Must be 10-20 digits"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Official Payment Receipt Number</label>
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
                                <label>Upload Payment Receipt Image</label>
                                <input
                                    type="file"
                                    name="receiptImage"
                                    accept="image/*"
                                    required
                                    onChange={handleFileChange}
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

export default For2Wheels;
