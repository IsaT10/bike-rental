import { User } from './user.model';
import { TUser } from './user.interface';

const getProfileFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateProfileIntoDB = async (id: string, payload: Partial<TUser>) => {
  if (payload.password) {
    payload.password = await User.hashPassword(payload.password);
  }

  //update profile
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-updatedAt -createdAt -__v');

  return result;
};

export { updateProfileIntoDB, getProfileFromDB };
