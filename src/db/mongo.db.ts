import { MongoClient } from 'mongodb';
import { IBlog, IPost } from '../routes';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const mongoDBName = process.env.MONGODB_DB_NAME || 'local';

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
