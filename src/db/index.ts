import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";


const envPath = path.resolve(__dirname, '../../.env');
console.log(`Checking for .env file at: ${envPath}`);
console.log(`.env file exists: ${fs.existsSync(envPath) ? 'Yes' : 'No'}`);


dotenv.config({ path: envPath });


const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/fraud_detection';

if (!MONGO_URL) {
   
  console.error("MongoDB connection string not found in environment variables");
  process.exit(1);
}

console.log(MONGO_URL)
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const connection = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error : any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


export { connectDB, mongoose };