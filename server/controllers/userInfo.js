import jwt from 'jsonwebtoken';
import Userauth from '../model/model.js'; 

 const getUserInfo = async (req, res) => {
  const jwt_secret = process.env.jwt_secret
  const token = req.header('Authorization').split(' ')[1];
    
  try {
    
    const decoded = jwt.verify(token, jwt_secret);
    
    const user = await Userauth.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    res.status(200).json({ userName: user.fullName });
    
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export {getUserInfo}