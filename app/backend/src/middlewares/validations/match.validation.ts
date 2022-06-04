import { Request, Response, NextFunction } from 'express';
import { matchSchema } from '../joi';

const isValidMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = matchSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

export default isValidMatch;
