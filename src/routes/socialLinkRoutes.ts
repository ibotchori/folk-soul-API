import express from 'express'
import {
  socialLinkAvatarChange,
  socialLinkDelete,
  socialLinkRegister,
  socialLinkUpdate,
} from 'controllers/socialLinkCOntroller'
import { multerConfig } from '../config/multer'
import multer from 'multer'

const router = express.Router()

router.post('/register', socialLinkRegister)
router.put('/update/:id', socialLinkUpdate)
router.post(
  '/change-avatar/:id',
  multer(multerConfig).single('image'),
  socialLinkAvatarChange
)
router.delete('/delete/:id', socialLinkDelete)

export default router
