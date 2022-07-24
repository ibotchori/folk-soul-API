import express from 'express'
import {
  bandMemberRegister,
  changeMemberAvatar,
} from 'controllers/bandMemberController'
import { multerConfig } from '../config/multer'
import multer from 'multer'

const router = express.Router()

router.post('/register', bandMemberRegister)
router.post(
  '/change-avatar/:id',
  multer(multerConfig).single('image'),
  changeMemberAvatar
)

export default router
