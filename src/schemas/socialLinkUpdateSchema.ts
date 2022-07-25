import Joi from 'joi'
import { socialLinkInterface } from 'types/types'

const socialLinkUpdateSchema = async (data: socialLinkInterface) => {
  return Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      'string.empty': `Name cannot be an empty field.`,
      'string.base': 'Name field should be string.',
      'string.min': 'Name field should be at lease {#limit} characters long.',
      'string.max': 'Name field should be maximum {#limit} characters long.',
      'any.required': 'name field is required.',
    }),
    url: Joi.string()
      .regex(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      )
      .required()
      .messages({
        'string.pattern.base': `URL format is required.`,
        'any.required': 'url field is required.',
        'string.empty': `URL cannot be an empty field.`,
      }),
  })
}

export default socialLinkUpdateSchema
