import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Userauth from '../model/model.js'; // Replace with your User model
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Create a transporter using the Ethereal email service
let transporter; // Define transporter outside the callback

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });
});

// Controller function to handle user signup with email verification
const signupUser = async (req, res) => {
  console.log('++++++++++++++++');
  const { fullName, companyName, email, role, department, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user already exists in the database
    const existingUser = await Userauth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate and send OTP to the user's email
    const OTP = generateOTP();
    console.log(OTP);
    const mailOptions = {
      from: 'your@email.com', // Replace with your email
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP is: ${OTP}`,
    };

    transporter.sendMail(mailOptions).then(info => {
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with email verification fields
    const user = new Userauth({
      fullName,
      companyName,
      email,
      role,
      department,
      password: hashedPassword,
      otp: OTP,
      emailVerified: false,
    });

    await user.save();

    // Generate a JWT token after successful signup
    const token = jwt.sign({ email: user.email }, 'your-secret-key', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(201).json({
      message: 'Signup successful. Check your email for OTP.',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  console.log('===========Verifying email==============')
  const { email, otp } = req.body;
  console.log('======>>>>>'+otp)

  try {
    // Find the user with the provided email and OTP
    const user = await Userauth.findOne({ email, otp });

    if (!user) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Mark the email as verified in the user document
    user.emailVerified = true;
    user.otp = null; // Remove the OTP
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { signupUser, verifyEmail };
