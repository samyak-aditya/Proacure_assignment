import bcrypt from 'bcrypt';
import Userauth from '../model/model.js'; 
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
 const jwt_secret = process.env.jwt_secret
  const { email, password } = req.body;

  try {
   
    const user = await Userauth.findOne({ email });

    if (!user) {
      return res.status(402).json({ error: 'Invalid credentials' });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      
      const token = jwt.sign({ email: user.email }, jwt_secret, {
        expiresIn: '1h', 
      });

      res.status(200).json({
        message: 'Login successful',
        user: user,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default loginUser;
