import React, { useState } from 'react';
import './Login.css';
import img from '../assets/img.png';
import loginimg from '../assets/login1.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Add form handling and error messages

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      {/* Left Side (Image Placeholder) */}
      
      <div className=" flex items-end justify-center w-1/2 p-8">
      
        <img src={loginimg} alt="astrous" className="w-full h-full object-cover" />
        
        {/* Add your image or content here */}
        {/* Example: <img src="your-image-url" alt="Login" className="w-full h-auto" /> */}
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-full p-4 lg:w-1/2 flex items-center justify-center h-screen">
        
        <div className="bg-white flex-col lg:flex-row rounded-lg shadow-lg p-2 lg:w-1/2 xl:w-1.5/2  xs:w-full sm:w-full overflow-y-auto">

          {/* Added responsive height classes */}
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4">Login</h1>
          <div className='flex items-center justify-center'>
            <img src={img} alt="login" />
          </div>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400 "
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 ">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 p-2 w-full border rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400 "
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

            <div className="mb-4 flex items-center justify-center ">
              {/* Add form submission and error message handling */}
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md active:scale-95  hover:shadow-md hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
