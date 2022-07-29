import express from 'express'
import { registerBand } from 'controllers/bandController'

const router = express.Router()

router.post('/register', registerBand)

export default router
