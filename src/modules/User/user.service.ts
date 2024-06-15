import { User } from './user.model';
import { TUser } from './user.interface';

const getProfileFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateProfileIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-updatedAt -createdAt -__v');

  // const { updatedAt, createdAt, ...remaining } = result!.toObject();

  return result;
};

export { updateProfileIntoDB, getProfileFromDB };
