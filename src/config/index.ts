import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  salt_round: process.env.SALT_ROUNDS,
  access_secret: process.env.JWT_ACCESS_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
