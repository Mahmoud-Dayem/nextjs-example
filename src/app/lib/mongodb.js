// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};
const url = "mongodb+srv://hussinmahmoud3030_db_user:svRaSiI2s1XsAwlR@dayemcluster.bgybiei.mongodb.net/?retryWrites=true&w=majority&appName=dayemCluster"
 
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In dev mode, use a global variable so it’s not re-created on every HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
