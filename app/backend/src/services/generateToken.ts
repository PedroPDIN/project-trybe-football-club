import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

<<<<<<< HEAD
const secret = readFileSync('jwt.evaluation.key', 'utf-8');
=======
const generateToken = (email: string): string => {
  const secret = readFileSync('jwt.evaluation.key', 'utf-8');
>>>>>>> 6e31926 (feat(requisitos 7, 9, 11 e 13): adiciona requisitos completos.)

const generateToken = (email: string): string => {
  const payload = { user: email };

  const token = jwt.sign(payload, String(secret), { expiresIn: '10d' });

  return token;
};

export {
  secret,
  generateToken,
};
