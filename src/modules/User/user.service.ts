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

export {
  updateProfileIntoDB,
  getProfileFromDB,
  getAllUserFromDB,
  roleChangeUser,
  deleteUserFromDB,
};
