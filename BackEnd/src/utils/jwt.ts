import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, config.jwtSecret, { expiresIn: '1h' });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
