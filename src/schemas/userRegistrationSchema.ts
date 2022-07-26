import Joi from 'joi'
import { userInterface } from 'types/types'
import User from '../models/userModel'

const usernameShouldBeUniqueRule =
  (user: userInterface | null) => (value: string, helper: any) => {
    if (!user) {
      return value
    }
    if (user.username === value) {
      return helper.message('This username is already taken.')
    }
    return value
  }

const userRegistrationSchema = async (data: userInterface) => {
  const foundUserWithUsername = await User.findOne({ username: data.username })

  return Joi.object({
    username: Joi.string()
      .regex(/^[a-z0-9]+$/)
      .min(3)
      .max(30)
      .custom(
        usernameShouldBeUniqueRule(foundUserWithUsername),
        'unique username'
      )
      .required()
      .messages({
        'string.pattern.base': `Username should be lowercase letters and numbers.`,
        'string.empty': `Username cannot be an empty field`,
        'string.base': 'Username field should be string.',
        'string.min':
          'Username field should be at lease {#limit} characters long.',
        'string.max':
          'Username field should be maximum {#limit} characters long.',
        'any.required': 'username field is required.',
      }),
    password: Joi.string().alphanum().min(3).required().messages({
      'string.base': 'Password field should be string.',
      'string.alphanum': 'Password field should be alphanumeric.',
      'any.required': 'password field is required.',
      'string.min': `Password should have a minimum length of {#limit}`,
    }),
    repeatPassword: Joi.any().equal(Joi.ref('password')).required().messages({
      'any.only': 'Passwords does not match',
      'any.required': 'repeatPassword field is required.',
    }),
  })
}

export default userRegistrationSchema
