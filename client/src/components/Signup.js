import React, { useState } from 'react';
import { signup } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import Authenticate from './otpverify.js';
import axios from 'axios';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const history = useNavigate();


  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (password !== confirmPasswordValue) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Call the login function to send data to the backend
      const response = await axios.post('http://localhost:5000/signup', {fullName, companyName, email, role, department, password});
      
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
      }
      //const verifyemail= Authenticate(email)
      console.log('Login successful', response);
      // Handle success, e.g., store user token in state or localStorage
      console.log("===="+email)
      history(`/authenticate/${email}`)
    } catch (error) {
      console.error('Login error', error);
      // Handle error, e.g., display error message to the user
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 p-8">
        {/* Add your image or content here */}
      </div>
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              required
              type="text"
              id="fullName"
              className="mt-1 p-2 w-full shadow-lg border rounded-md"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              required
              type="text"
              id="companyName"
              className="mt-1 p-2 w-full border shadow-lg rounded-md"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              className="mt-1 p-2 w-full border shadow-lg rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role/Title
            </label>
            <input
              required
              type="text"
              id="role"
              className="mt-1 p-2 w-full border shadow-lg rounded-md"
              placeholder="Enter your role/title"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              required
              type="text"
              id="department"
              className="mt-1 p-2 w-full border shadow-lg rounded-md"
              placeholder="Enter your department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 p-2 w-full border shadow-lg rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={`mb-4 ${!passwordMatch ? 'border-red-500' : ''}`}>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {!passwordMatch && confirmPassword !=="" ? 'Confirm Password - Do not match!' : 'Confirm Password '}
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`mt-1 p-2 w-full shadow-lg rounded-md ${
                !passwordMatch && confirmPassword !=="" ? 'ring-2 ring-red-500 focus:ring-2 focus:outline-none focus:ring-red-500' : 'border'
              }`}
            />
          </div>

          <div className="mb-4">
            <input
              required
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm font-medium text-gray-700">
              Show Password
            </label>
          </div>

          <div className="mb-4">
            <button type="submit" className={`bg-blue-500 text-white p-2 rounded-md ${passwordMatch ? '' : 'bg-gray-300 cursor-not-allowed'}`} disabled={!passwordMatch}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
