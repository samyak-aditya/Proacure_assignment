// Authenticate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const Authenticate = () => {
  const [otp, setOtp] = useState('');
  const { email } = useParams();
  const history = useNavigate();
  

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      
      const response = await axios.post(`http://localhost:5000/verification`, { email, otp }); 
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
      }
      
      history('/homepage');
    } catch (error) {
      console.error('OTP verification error', error);
      
    }
  };


  return (
    <div className="w-full p-4 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-2 w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold flex items-center justify-center mb-4">
          Please Enter the OTP
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-center text-gray-700">
              The One Time Password has bee sent to your email ID
            </label>
            <input
              required
              type="text"
              id="otp"
              className="mt-1 p-2 w-full border-2 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:shadow-sm focus:ring-gray-400"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>

          <div className="mb-4 flex items-center justify-center">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authenticate;
