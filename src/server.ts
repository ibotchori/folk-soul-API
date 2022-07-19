import express, { Request, Response } from 'express'

import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.SERVER_PORT || 4444

const server = express()

server.get('/', async (_: Request, res: Response) => {
  res.send(`
   Hello World
    `)
})

server.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
)
