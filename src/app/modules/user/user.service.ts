import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserID } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const generatedId = await generateUserID();
  user.id = generatedId;

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create used');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
