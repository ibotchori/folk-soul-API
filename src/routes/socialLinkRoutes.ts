import express from 'express'
import {
  getAllSocialLinks,
  changeSocialLinkAvatar,
  deleteSocialLink,
  registerSocialLink,
  updateSocialLink,
  getSocialLink,
} from 'controllers/socialLinkController'
import { multerConfig } from '../config/multer'
import multer from 'multer'
import authMiddleware from 'middleware/authMiddleware'

const router = express.Router()

router.post('/register', authMiddleware, registerSocialLink)
router.put('/update/:id', authMiddleware, updateSocialLink)
router.post(
  '/change-avatar/:id',
  multer(multerConfig).single('image'),
  authMiddleware,
  changeSocialLinkAvatar
)
router.delete('/delete/:id', authMiddleware, deleteSocialLink)
router.get('/get/:id', authMiddleware, getSocialLink)
router.get('/get-all', getAllSocialLinks)

export default router
