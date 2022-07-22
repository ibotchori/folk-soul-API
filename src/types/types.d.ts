import mongoose from 'mongoose'

export interface userInterface {
  _id?: mongoose.Types.ObjectId
  username: string
  password: string
}
export interface bandMemberInterface {
  _id?: mongoose.Types.ObjectId
  name: string
  instrument: string
  orbitLength: number
  color: string
  biography: string
}
