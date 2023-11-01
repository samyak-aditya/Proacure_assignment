import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number, // You can adjust the type for the OTP as needed
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

const Userauth = model('Userauth', userSchema);

export default Userauth;
