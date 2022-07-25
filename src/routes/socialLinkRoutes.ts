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
import { socialLinkRegister } from 'controllers/socialLinkCOntroller'

const router = express.Router()

router.post('/register', socialLinkRegister)

export default router
