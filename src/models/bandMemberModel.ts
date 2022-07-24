import { Schema, model } from 'mongoose'
import { bandMemberInterface } from 'types/types'

// 2. Create a Schema corresponding to the document interface.
const BandMemberSchema = new Schema<bandMemberInterface>(
  {
    name: { type: String, required: true },
    instrument: { type: String, required: true },
    orbitLength: { type: Number, required: true },
    color: { type: String, required: true },
    biography: { type: String, required: true },
    avatar: { type: String },
  },
  { versionKey: false }
)

// 3. Create a Model.
const BandMember = model<bandMemberInterface>('BandMember', BandMemberSchema)

export default BandMember
