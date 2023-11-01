import bcrypt from 'bcrypt';
import Userauth from '../model/model.js'; // Replace with your User model
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  console.log('////////////////////////////////////////////');
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Userauth.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the provided password against the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated

      // Generate a JWT token after successful login
      const token = jwt.sign({ email: user.email }, 'your-secret-key', {
        expiresIn: '1h', // Token expires in 1 hour
      });

      res.status(200).json({
        message: 'Login successful',
        user: user,
        token: token,
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default loginUser;
