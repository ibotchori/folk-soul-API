import { Schema, model } from 'mongoose'
import { socialLinkInterface } from 'types/types'

// 2. Create a Schema corresponding to the document interface.
const SocialLinkSchema = new Schema<socialLinkInterface>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    avatar: { type: String },
  },
  { versionKey: false }
)

// 3. Create a Model.
const SocialLink = model<socialLinkInterface>('SocialLink', SocialLinkSchema)

export default SocialLink
