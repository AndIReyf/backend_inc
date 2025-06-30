import { MongoClient } from 'mongodb';
import { IBlog, IPost } from '../routes';
import 'dotenv/config';

const mongoURI = process.env.MONGODB_URI;
const mongoDBName = process.env.MONGODB_DB_NAME;

if (!mongoURI) {
  throw new Error('MongoDB URI not found');
}

if (!mongoDBName) {
  throw new Error('MongoDB name not found');
}

const client = new MongoClient(mongoURI);
const db = client.db(mongoDBName);

export const connectMongoDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected the client to MongoDB...');

    await db.command({ ping: 1 });
    console.log('Connected Successfully!');
  } catch (error) {
    console.error('Error connection to MongoDB:', error);
    await client.close();
  }
};

export const blogsCollectionDB = db.collection<IBlog>('blogs');
export const postsCollectionDB = db.collection<IPost>('posts');
