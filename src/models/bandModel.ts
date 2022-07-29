import { Schema, model } from 'mongoose'
import { bandInterface } from 'types/types'

// 2. Create a Schema corresponding to the document interface.
const BandSchema = new Schema<bandInterface>(
  {
    text: { type: String, required: true },
    avatar: { type: String },
  },
  { versionKey: false }
)

// 3. Create a Model.
const Band = model<bandInterface>('Band', BandSchema)

export default Band
