import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUNDS,
  access_secret: process.env.JWT_ACCESS_SECRET,
  access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
  stripe_key: process.env.STRIPE_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
