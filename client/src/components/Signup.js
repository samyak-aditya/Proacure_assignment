import React, { useState } from 'react';

const SignupPage =()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  // Add form handling for OTP verification and error messages

  const sendOtp = () => {
    // Simulate OTP sending (replace with your actual logic)
    // Upon successful sending, set verificationSent to true.
    setVerificationSent(true);
  };

  const verifyOtp = () => {
    // Simulate OTP verification (replace with your actual logic)
    console.log('OTP Verified');
  };

  return (
    <div className="flex">
      {/* Left Side (Image Placeholder) */}
      <div className="w-1/2 p-8">
        {/* Add your image or content here */}
        {/* Example: <img src="your-image-url" alt="Signup" className="w-full h-auto" /> */}
      </div>

      {/* Right Side (Signup Form) */}
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
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
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
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

          <div className="mb-4">
            {verificationSent ? (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            ) : (
              <button type="button" onClick={sendOtp} className="bg-blue-500 text-white p-2 rounded-md">
                Send OTP
              </button>
            )}
          </div>

          <div className="mb-4">
            {/* Add form submission and error message handling */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
