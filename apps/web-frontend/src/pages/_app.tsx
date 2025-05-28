'use client'
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import RegisterForm from './Registration';
import Slider from './Slider';
import Dashboard from './Dashboard';
import PatientForm from './PatientForm';
import Footer from './Footer';
import DoctorForm from './DoctorForm';

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'doctor' | 'patient' | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // const handleLoginSuccess = (doctorStatus: boolean) => {
  //   setIsLoggedIn(true);
  //   console.log(doctorStatus);
  // };
  const [formData, setFormData] = useState({
    nname: '',
    ppassword: ''
  });
  
  const [errors, setErrors] = useState({
    nname: '',
    ppassword: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.nname.trim()) {
      newErrors.nname = 'Name is required';
      isValid = false;
    } else if (formData.nname.length < 3) {
      newErrors.nname = 'Name must be at least 3 characters';
      isValid = false;
    }

    if (!formData.ppassword) {
      newErrors.ppassword = 'Password is required';
      isValid = false;
    } else if (formData.ppassword.length < 6) {
      newErrors.ppassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Determine user type
      if (formData.nname.toLowerCase().includes('doctor')) {
        setUserType('doctor');
      } else {
        setUserType('patient');
      }
      
       setIsLoggedIn(true);
    setShowLoginForm(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        {userType === 'doctor' ? (
          <Dashboard />
        ) : (
          <DoctorForm />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="bg-sky-100 shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">PearlThoughts</div>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-yellow-600 transition duration-200" onClick={() => setShowLoginForm(true)}>
            Login
          </button>
        </div>
      </div>


      {showLoginForm && (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-3">
              Sign in to your account
            </h3>
            <div className='container box-shadow'>
              <div className='row'>
                <div className='col-lg-12'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <p>Name*</p>
                      <input 
                        className={`form-control ${errors.nname ? 'is-invalid' : ''}`} 
                        type='text' 
                        placeholder='Enter the Name'
                        name='nname'  
                        value={formData.nname}  
                        onChange={handleChange} 
                        required
                      />
                      {errors.nname && <div className="invalid-feedback">{errors.nname}</div>}
                    </div>
                    <div className='mb-3'>
                      <p>Password*</p>
                      <input 
                        className={`form-control ${errors.ppassword ? 'is-invalid' : ''}`} 
                        type='password' 
                        placeholder='Enter the Password'
                        name='ppassword' 
                        value={formData.ppassword}
                        onChange={handleChange} 
                        required
                      />
                      {errors.ppassword && <div className="invalid-feedback">{errors.ppassword}</div>}
                    </div>
                    <button className='btn btn-success form-control mb-4' type="submit">Submit</button>
                    <button 
                      className='btn btn-warning form-control' 
                      onClick={() => setShowLoginForm(false)}
                    >
                      Back
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
{showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <RegisterForm />
            <button 
              onClick={() => setShowRegister(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
    </div>    
   
      )}

      {!showLoginForm && !isLoggedIn && (
        <>
          <div className='container mt-5 mb-4'>
            <div className='row'>
              <div className='col-lg-12'>
                <Slider/>
              </div>
            </div>
          </div>
          <div className='container mt-5 mb-4'>
            <div className='row'>
              <div className='col-lg-12'>
                    <PatientForm />
                </div>
            </div>
          </div>       
           <div className='container-fluid mt-5 mb-4'>
            <div className='row'>
        
                <div className='col-lg-12'>
                    <Footer />
                </div>
               </div>
         </div>
         
        </>
      )}
    </>
  );
}
