import express from 'express'
import {
  socialLinkRegister,
  socialLinkUpdate,
} from 'controllers/socialLinkCOntroller'

const router = express.Router()

router.post('/register', socialLinkRegister)
router.put('/update/:id', socialLinkUpdate)

export default router
