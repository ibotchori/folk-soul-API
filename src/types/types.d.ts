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
  avatar?: string
}
export interface socialLinkInterface {
  _id?: mongoose.Types.ObjectId
  name: string
  url: string
  avatar?: string
}
export interface bandInterface {
  _id?: mongoose.Types.ObjectId
  text: string
  avatar?: string
}
