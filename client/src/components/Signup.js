import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import signupimg from '../assets/signup.png';
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
  const [error, setError] = useState(''); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        fullName,
        companyName,
        email,
        role,
        department,
        password,
      });

      console.log('Signup successful', response);
      history(`/authenticate/${email}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); 
      } else {
        setError('An error occurred during signup');
      }

      setTimeout(() => {
        setError(''); 
      }, 5000); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex items-end justify-center w-1/2 p-8">
        <img src={signupimg} alt="" />
      </div>
      <div className="w-full p-4 lg:w-1/2 flex items-center justify-center h-screen">
        <div className="bg-white flex-col lg:flex-row rounded-lg shadow-lg p-2 lg:w-1/2 xl:w-1.5/2 xs:w-full sm:w-full overflow-y-auto">
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4">Sign Up</h1>
          <p className="">
            Have an Account? <Link className="font-bold" to="/login">Login</Link>
          </p>
          <br />
          {error && ( 
            <div className="bg-red-200 text-red-600 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  id="companyName"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role/Title
                </label>
                <input
                  required
                  type="text"
                  id="role"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your role/title"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  required
                  type="text"
                  id="department"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={`mb-4 ${!passwordMatch ? 'border-red-500' : ''}`}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {!passwordMatch && confirmPassword !== "" ? 'Confirm Password - Do not match!' : 'Confirm Password '}
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400 ${
                  !passwordMatch && confirmPassword !== "" ? 'ring-2 ring-red-500 focus:ring-2 focus:outline-none focus:ring-red-500' : 'border'
                }`}
              />
            </div>
            <div className="mb-4">
              <input
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
            <div className="mb-4 flex items-center justify-center">
              <button type="submit" className={`bg-blue-500 text-white p-2 rounded-md active:scale-95 hover:shadow-md hover:bg-blue-600`}>
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
