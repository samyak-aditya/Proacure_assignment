import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Userauth from '../model/model.js'; 
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

let transporter; 

nodemailer.createTestAccount((err, account) => {
 
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account.user, 
      pass: account.pass, 
    },
  });
});


const signupUser = async (req, res) => {
  console.log('++++++++++++++++');
  const { fullName, companyName, email, role, department, password } = req.body;
  
  try {
   
    const existingUser = await Userauth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    
    const OTP = generateOTP();
    console.log(OTP);
    const mailOptions = {
      from: 'your@email.com', 
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP is: ${OTP}`,
    };

    transporter.sendMail(mailOptions).then(info => {
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
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

  
    

    res.status(201).json({
      message: 'Signup successful. Check your email for OTP.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const jwt_secret = process.env.jwt_secret
  const { email, otp } = req.body;
 

  try {
   
    const user = await Userauth.findOne({ email, otp });

    if (!user) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    
    user.emailVerified = true;
    user.otp = null; 
    await user.save();

    const token = jwt.sign({ email: user.email }, jwt_secret, {
      expiresIn: '1h', 
    });
    res.status(200).json({ message: 'Email verified successfully',
    token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { signupUser, verifyEmail };
