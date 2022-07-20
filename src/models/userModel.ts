import { Schema, model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  userName: string
  password: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
)

// 3. Create a Model.
const User = model<IUser>('User', userSchema)

export default User
