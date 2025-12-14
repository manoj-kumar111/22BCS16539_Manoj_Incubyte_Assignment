import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  env: process.env.NODE_ENV || 'development',
};