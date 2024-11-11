import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './SignUp';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import ForPickNDrop from './pages/ForPickNDrop';
import ForStaffs from './ForStaffs';
import For2Vehicle from './For2Vehicle';
import ProtectedRoute from './ProtectedRoute'; 
import For4Wheels from './pages/For4Wheels';
import ForService from './pages/ForService';
import For2Wheels from './pages/For2Wheels';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<ProtectedRoute element={<LandingPage />} />} />
          <Route path="/vehicleregistration" element={<ProtectedRoute element={<For4Wheels />} />} />
          <Route path="/forpickndrop" element={<ProtectedRoute element={<ForPickNDrop />} />} />
          <Route path="/forservice" element={<ProtectedRoute element={<ForService />} />} />
          <Route path="/fortwowheelvehicle" element={<ProtectedRoute element={<For2Wheels />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
