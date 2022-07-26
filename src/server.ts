import express from 'express'
import { userRoutes, bandMemberRoutes, socialLinkRoutes } from './routes'
import { errorHandler } from 'middleware/errorMiddleware'
import connectDB from './config/db'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.SERVER_PORT || 4444

const server = express()
// Connect to mongo database
connectDB()

// Middleware
server.use(express.json()) // <-- body parser
server.use(express.urlencoded({ extended: false })) // <-- url encode
server.use('/uploads/images', express.static('uploads/images')) // <-- public access on uploads/images folder

server.use('/api/user', userRoutes)
server.use('/api/band-member', bandMemberRoutes)
server.use('/api/social-link', socialLinkRoutes)

// overwrite the default express error handler with custom error handler middleware
server.use(errorHandler) // <-- error handler middleware

server.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
)
