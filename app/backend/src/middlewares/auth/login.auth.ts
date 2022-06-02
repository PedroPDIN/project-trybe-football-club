import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '../../services';

const authLogin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) return res.status(401).json({ message: 'token not found' });

  verify(token, secret, (err, _decoded) => {
    if (err) return res.status(401).json({ message: 'Expired or invalid token' });
    next();
  });
};

export default authLogin;
