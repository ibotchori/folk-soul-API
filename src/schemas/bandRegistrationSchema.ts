import Joi from 'joi'
import { bandInterface } from 'types/types'

const bandRegistrationSchema = async (data: bandInterface) => {
  return Joi.object({
    text: Joi.string().min(3).required().messages({
      'string.empty': `Text cannot be an empty field`,
      'string.base': 'Text field should be string.',
      'any.required': 'text field is required.',
      'string.min': `Text should have a minimum length of {#limit}`,
    }),
  })
}

export default bandRegistrationSchema
