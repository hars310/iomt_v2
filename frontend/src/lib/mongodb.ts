import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string; // Ensure you have this environment variable set

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: mongoose.Mongoose | null = null;

export default async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient };
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
      // Remove deprecated options
    });
    cachedClient = client;
    return { client };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}
