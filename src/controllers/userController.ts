import { Request, Response } from 'express'

export const register = (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Error Message')
  }
  res.status(200).json({ message: 'Register User' })
}
export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login User' })
}
