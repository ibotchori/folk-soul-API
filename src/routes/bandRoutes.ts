import express from 'express'
import { multerConfig } from '../config/multer'
import multer from 'multer'
import authMiddleware from 'middleware/authMiddleware'
import {
  changeBandAvatar,
  getBand,
  registerBand,
  updateBand,
} from 'controllers/bandController'

const router = express.Router()

router.post('/register', authMiddleware, registerBand)
router.put('/update/:id', authMiddleware, updateBand)
router.post(
  '/change-avatar/:id',
  authMiddleware,
  multer(multerConfig).single('image'),
  changeBandAvatar
)
router.get('/', getBand)

export default router
