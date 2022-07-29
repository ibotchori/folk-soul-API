import express from 'express'
import { registerBand, updateBand } from 'controllers/bandController'

const router = express.Router()

router.post('/register', registerBand)
router.put('/update/:id', updateBand)

export default router
