import express from 'express'
import {
  getAllSocialLinks,
  changeSocialLinkAvatar,
  deleteSocialLink,
  registerSocialLink,
  updateSocialLink,
} from 'controllers/socialLinkCOntroller'
import { multerConfig } from '../config/multer'
import multer from 'multer'

const router = express.Router()

router.post('/register', registerSocialLink)
router.put('/update/:id', updateSocialLink)
router.post(
  '/change-avatar/:id',
  multer(multerConfig).single('image'),
  changeSocialLinkAvatar
)
router.delete('/delete/:id', deleteSocialLink)
router.get('/get-all', getAllSocialLinks)

export default router
