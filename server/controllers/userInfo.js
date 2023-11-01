import jwt from 'jsonwebtoken';
import Userauth from '../model/model.js'; // Replace with your User model

export const getUserInfo = async (req, res) => {
    console.log('________________________________________________________________');
  const token = req.header('Authorization').split(' ')[1]; // Get the token from the Authorization header
    console.log(token)
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'your-secret-key');
    console.log(decoded)
    // Use the user's email from the decoded token to find the user in the database
    const user = await Userauth.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's name
    res.status(200).json({ userName: user.fullName });
    console.log(user.fullName);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
