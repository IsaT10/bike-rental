import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUNDS,
  access_secret: process.env.JWT_ACCESS_SECRET,
  access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
  stripe_key: process.env.STRIPE_KEY,
};
