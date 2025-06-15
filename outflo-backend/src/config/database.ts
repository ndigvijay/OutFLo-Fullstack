import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY as string;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is required');
}

if (!CLAUDE_API_KEY) {
  throw new Error('CLAUDE_API_KEY environment variable is required');
}

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const config = {
  MONGO_URI,
  CLAUDE_API_KEY,
  CLAUDE_MODEL: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
  PORT: process.env.PORT || 6969,
};
