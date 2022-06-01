import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const key = readFileSync('json.evaluation.key', 'utf-8');

const generateToken = (email: string): string => {
  const payload = { user: email };

  const token = jwt.sign(payload, key, { expiresIn: '10d' });

  return token;
};

export default generateToken;
