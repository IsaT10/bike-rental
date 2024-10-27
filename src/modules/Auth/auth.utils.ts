import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: { id: Types.ObjectId; role: 'admin' | 'user' },
  secret: string,
  expiresIn: string
) =>
  jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
