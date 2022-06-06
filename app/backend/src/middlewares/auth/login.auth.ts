import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../services';

const authLogin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(401).json({ message: 'token not found' });

  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default authLogin;
