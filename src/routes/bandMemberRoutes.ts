import express from 'express'
import {
  bandMemberRegister,
  changeMemberAvatar,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
} from 'controllers/bandMemberController'
import { multerConfig } from '../config/multer'
import multer from 'multer'
import authMiddleware from 'middleware/authMiddleware'

const router = express.Router()

router.post('/register', authMiddleware, bandMemberRegister)
router.post(
  '/change-avatar/:id',
  multer(multerConfig).single('image'),
  authMiddleware,
  changeMemberAvatar
)
router.put('/update/:id', authMiddleware, updateMember)
router.delete('/delete/:id', authMiddleware, deleteMember)
router.get('/get/:id', authMiddleware, getMember)
router.get('/get-all', getAllMembers)

export default router
