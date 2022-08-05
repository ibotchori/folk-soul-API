import express from 'express'
import {
  userRoutes,
  bandMemberRoutes,
  socialLinkRoutes,
  bandRoutes,
} from './routes'
import { errorHandler } from 'middleware/errorMiddleware'
import connectDB from './config/db'
import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'

/**
 * Load swagger document.
 */
const swaggerDocument = YAML.load('./src/config/swagger.yaml')

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.SERVER_PORT || 4444

const server = express()
// Connect to mongo database
connectDB()

/**
 * Setting up swagger middleware.
 */
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Middleware
server.use(express.json()) // <-- body parser
server.use(express.urlencoded({ extended: false })) // <-- url encode
server.use('/uploads/images', express.static('uploads/images')) // <-- public access on uploads/images folder
server.use(cors())

server.use('/api/user', userRoutes)
server.use('/api/band-member', bandMemberRoutes)
server.use('/api/social-link', socialLinkRoutes)
server.use('/api/band', bandRoutes)

// home page
server.get('/', (req, res) => {
  res.send('Add "/api-docs" in url to see documentation')
})

// overwrite the default express error handler with custom error handler middleware
server.use(errorHandler) // <-- error handler middleware

server.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
)
