import mongoose from 'mongoose'

export interface userInterface {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
}
