/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';
import { TUser } from './user.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const getProfileFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
const roleChangeUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    {
      new: true,
    }
  );

  return result;
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userSearchableFields = ['name'];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await userQuery.queryModel;

  return result;
};

const updateProfileIntoDB = async (
  id: string,
  payload: Partial<TUser>,
  file: any
) => {
  if (payload.password) {
    payload.password = await User.hashPassword(payload.password);
  }

  const userData = { ...payload, image: file?.path };

  //update profile
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
  }).select('-updatedAt -createdAt -__v');

  return result;
};

export {
  updateProfileIntoDB,
  getProfileFromDB,
  getAllUserFromDB,
  roleChangeUser,
  deleteUserFromDB,
};
