import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserID } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const generatedId = await generateUserID()
  user.id = generatedId

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create used')
  }
  return createdUser
}

export default {
  createUser,
}
