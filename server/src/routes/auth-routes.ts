import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  // Get the username and password from the request body
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ where: { username } });
  
  //if the user does not exist, return a 401 status code
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Compare the password with the stored hash
  const validPassword = await bcrypt.compare(password, user.password);
  // If the password is invalid, return a 401 status code
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Create a JWT token
  const token = jwt.sign({ username: user.username }, secretKey);
  return res.json({ token });
}

// Create a new router
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
