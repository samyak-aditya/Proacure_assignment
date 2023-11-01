// Authenticate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const Authenticate = () => {
  const [otp, setOtp] = useState('');
  const { email } = useParams();
  const history = useNavigate();
  console.log('>>>>>>>>>>'+email+'<<<<<<<<<<<');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send OTP to the backend for verification
      console.log('><<<<<<<<<<<<>'+email+'<<<<<<<<<<<');
      await axios.post(`http://localhost:5000/verification`, { email, otp }); // Replace API_BASE_URL with your actual API URL
      // Handle success, e.g., redirect the user to a success page
      // You can use React Router to redirect the user to a success page
      // Example: history.push('/verification-success');
      history('/homepage');
    } catch (error) {
      console.error('OTP verification error', error);
      // Handle error, e.g., display an error message to the user
    }
  };


  return (
    <div className="w-full p-4 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-2 w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold flex items-center justify-center mb-4">
          Enter OTP
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
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
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authenticate;
