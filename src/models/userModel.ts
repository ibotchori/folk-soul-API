import { Schema, model } from 'mongoose'
import { userInterface } from 'types/types'

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<userInterface>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
)

// 3. Create a Model.
const User = model<userInterface>('User', userSchema)

export default User
