// src/utils/helpers.js
import mongoose from 'mongoose';

// Singleton pattern for MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection exists, establish one
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      dbName: "finance_tracker",  // Ensure this is set to your DB name
    };

    // Initiating the MongoDB connection promise
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }

  // Wait for connection promise to resolve
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
