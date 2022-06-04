import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../joi';

const isValidLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const bollEmail = regex.test(String(email));

  const { error } = loginSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: 'All fields must be filled' });
  if (!bollEmail) {
    return res
      .status(401)
      .json({ message: 'Incorrect email or password' });
  }
  next();
};

export default isValidLogin;
