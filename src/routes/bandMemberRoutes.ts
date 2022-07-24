import express from 'express'
import {
  bandMemberRegister,
  changeMemberAvatar,
  deleteMember,
  getMember,
  updateMember,
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
router.put('/update/:id', updateMember)
router.delete('/delete/:id', deleteMember)
router.get('/get/:id', getMember)

export default router
