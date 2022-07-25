import Joi from 'joi'
import { socialLinkInterface } from 'types/types'
import SocialLink from '../models/socialLinkModel'

const nameShouldBeUniqueRule =
  (socialLink: socialLinkInterface) => (value: string, helper: any) => {
    if (!socialLink) {
      return value
    }
    if (socialLink.name === value) {
      return helper.message('This Social link is already registered.')
    }
    return value
  }

const socialLinkRegistrationSchema = async (data: socialLinkInterface) => {
  const foundSocialLinkWithName: any = await SocialLink.findOne({
    name: data.name,
  })

  return Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .custom(nameShouldBeUniqueRule(foundSocialLinkWithName), 'unique name')
      .required()
      .messages({
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

export default socialLinkRegistrationSchema
