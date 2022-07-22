import express from 'express'
import { bandMemberRegister } from 'controllers/bandMemberController'

const router = express.Router()

router.post('/register', bandMemberRegister)

export default router
