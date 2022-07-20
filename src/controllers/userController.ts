import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from 'models/userModel'
import userRegistrationSchema from 'schemas/userRegistrationSchema'
import bcrypt from 'bcrypt'

export const userRegister = asyncHandler(
  async (req: Request, res: Response) => {
    /* Validation with Joi */
    const validator = await userRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      //  return res.status(422).json(error.details)
      res.status(422)
      throw new Error(error.details[0].message)
    }
    // value from Joi
    const { password, username } = data

    // Hash password
    // create salt
    const salt = await bcrypt.genSalt(10)
    // generate hashed password with salt (password = entered password, from request body)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
      username,
      password: hashedPassword,
    })
    // back user information on response
    if (user) {
      res.status(201).json({
        message: 'User is registered.',
        _id: user.id,
      })
    }
  }
)
export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login User' })
})
