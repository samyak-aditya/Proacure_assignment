import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import img from '../assets/img.png';
import loginimg from '../assets/login1.png';
import { login } from '../api/api.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const [error, setError] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      if (response.token) {
        localStorage.setItem('jwtToken', response.token);
        history('/homepage');
      } else {
        setError('Login error: Try again later');
        setTimeout(() => {
          setError(null); 
        }, 3000); 
      }
    } catch (error) {
      setError('Login error: Invalid Credentials');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      
      <div className="flex items-end justify-center w-1/2 p-8">
        <img src={loginimg} alt="astrous" className="w-full h-full object-cover" />
      </div>

     
      <div className="w-full p-4 lg:w-1/2 flex items-center justify-center h-screen">
        <div className="bg-white flex-col lg:flex-row rounded-lg shadow-lg p-2 lg:w-1/2 xl:w-1.5/2 xs:w-full sm:w-full overflow-y-auto">
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4">Login</h1>
          <p className="">Don't have an Account? <Link className="font-bold" to="/signup">SignUp</Link></p>
          {error && (
            <div className="bg-red-200 text-red-600 p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <div className="flex items-center justify-center">
            <img src={img} alt="login" />
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 p-2 w-full border rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md active:scale-95 hover:shadow-md hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
