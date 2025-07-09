import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URL;
// console.log(mongoUri)
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in environment variables');
  }
  try {
   const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};
