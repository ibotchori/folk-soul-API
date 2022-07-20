import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from 'models/userModel'

export const register = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Error Message')
  }
  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
  })
  res.status(200).json(user)
})
export const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login User' })
})
