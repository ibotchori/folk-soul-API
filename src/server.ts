import express from 'express'
import { userRoutes } from './routes'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.SERVER_PORT || 4444

const server = express()

server.use('/api/user', userRoutes)

server.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
)
