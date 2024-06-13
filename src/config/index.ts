import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
};
