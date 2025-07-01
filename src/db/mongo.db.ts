import { MongoClient } from 'mongodb';
import { processEnv } from '../core';
import { IBlog, IPost } from '../routes';

const { mongoUri, mongoDBName } = processEnv;

if (!mongoUri) {
  throw new Error('MongoDB URI not found');
}

if (!mongoDBName) {
  throw new Error('MongoDB name not found');
}

const client = new MongoClient(mongoUri);
const db = client.db(mongoDBName);

export const connectMongoDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('Connected the client to MongoDB...');

    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
  } catch (e) {
    await client.close();
    throw new Error(`❌ Database not connected: ${e}`);
  }
};

export const blogsDBCollection = db.collection<IBlog>('blogs');
export const postsDBCollection = db.collection<IPost>('posts');
