import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from 'models/userModel'
import userRegistrationSchema from 'schemas/userRegistrationSchema'
import bcrypt from 'bcrypt'
import userLoginSchema from 'schemas/userLoginSchema'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

/* Generate JWT */
const generateToken = (id: mongoose.Types.ObjectId) =>
  // it takes 3 argument. 1 payload, passed in {id} (set the id in the token). 2 secret. 3 expires in
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

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
  /* Validation with Joi */
  const validator = await userLoginSchema(req.body)
  const { value: data, error } = validator.validate(req.body)

  if (error) {
    //  return res.status(422).json(error.details)
    res.status(422)
    throw new Error(error.details[0].message)
  }
  // value from Joi
  const { username, password } = data

  // check if user is already in database and password is correct
  const userExist: any = await User.findOne({ username })

  const passwordIsCorrect = await bcrypt.compare(password, userExist.password)
  if (userExist && passwordIsCorrect) {
    // back token on response
    res.json({
      token: generateToken(userExist._id),
    })
  } else {
    // if password is incorrect
    res.status(400)
    throw new Error('Please, provide correct credentials...')
  }
})
