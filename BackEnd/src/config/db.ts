import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from './env';

export const connectDB = async () => {
  try {
    const uri = config.mongoUri;
    try {
      await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return;
    } catch (primaryErr) {
      console.warn('Primary MongoDB connection failed, starting in-memory server...');
      const memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      await mongoose.connect(memUri);
      console.log(`MongoDB Memory Server Connected: ${mongoose.connection.host}`);
      return;
    }
  } catch (error) {
    console.error('Error connecting to MongoDB (including memory server fallback):', error);
    process.exit(1);
  }
};
