import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const generateToken = (email: string): string => {
  const secret = readFileSync('json.evaluation.key', 'utf-8');

  const payload = { user: email };

  const token = jwt.sign(payload, String(secret), { expiresIn: '10d' });

  return token;
};

export default generateToken;
