import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import { TUser } from './user.interface';

const getProfileFromDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email });

  return result;
};

const updateProfileIntoDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });

  const { updatedAt, createdAt, ...remaining } = result!.toObject();

  return remaining;
};

export { updateProfileIntoDB, getProfileFromDB };
