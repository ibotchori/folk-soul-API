import express from 'express'
import { bandMemberRegister } from 'controllers/bandMemberController'
import { multerConfig } from '../config/multer'
import multer from 'multer'
import { Request, Response } from 'express'

const router = express.Router()

router.post('/register', bandMemberRegister)
router.post(
  '/change-avatar',
  multer(multerConfig).single('image'),
  (request: Request, response: Response) => {
    console.log(request.file)

    return response.json({ message: 'Image uploaded' })
  }
)

export default router
