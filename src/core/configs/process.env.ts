import 'dotenv/config';

export const processEnv = {
  mongoUri: process.env.MONGODB_URI,
  mongoDBName: process.env.MONGODB_DB_NAME,
  port: process.env.PORT || 5001,
};
