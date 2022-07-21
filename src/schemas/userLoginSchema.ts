import Joi from 'joi'
import { userInterface } from 'types/Joi'
import User from '../models/userModel'

const determineIfUserExists =
  (user: userInterface | null) => (value: string, helpers: any) => {
    if (!user) {
      return helpers.message('There is no user with this username.')
    }
    return value
  }

const userLoginSchema = async (data: userInterface) => {
  const user = await User.findOne({ username: data.username })

  return Joi.object({
    username: Joi.string()
      .custom(determineIfUserExists(user))
      .required()
      .messages({
        'string.empty': `Username cannot be an empty field`,
        'string.base': 'Username field should be string.',
        'any.required': 'username field is required.',
      }),

    password: Joi.string().required().messages({
      'string.empty': `Password cannot be an empty field`,
      'string.base': 'Password field should be string.',
      'any.required': 'password field is required.',
    }),
  })
}

export default userLoginSchema
