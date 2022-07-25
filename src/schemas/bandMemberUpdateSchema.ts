import Joi from 'joi'
import { bandMemberInterface } from 'types/types'

const bandMemberUpdateSchema = async (data: bandMemberInterface) => {
  return Joi.object({
    name: Joi.string()
      .regex(/[\u10A0-\u10FF]$/)
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': `Name should be in Georgian alphabet.`,
        'string.empty': `Name cannot be an empty field`,
        'string.base': 'Name field should be string.',
        'string.min': 'Name field should be at lease {#limit} characters long.',
        'string.max': 'Name field should be maximum {#limit} characters long.',
        'any.required': 'name field is required.',
      }),
    instrument: Joi.string()
      .regex(/[\u10A0-\u10FF]$/)
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': `Instrument should be in Georgian alphabet.`,
        'string.empty': `Instrument cannot be an empty field`,
        'string.base': 'Instrument field should be string.',
        'string.min':
          'Instrument field should be at lease {#limit} characters long.',
        'string.max':
          'Instrument field should be maximum {#limit} characters long.',
        'any.required': 'instrument field is required.',
      }),

    orbitLength: Joi.number().min(1).max(10).required().messages({
      'string.empty': `Orbit length cannot be an empty field`,
      'string.base': 'Orbit length field should be number.',
      'number.min':
        'Orbit length field should be at lease {#limit} characters long.',
      'number.max':
        'Orbit length field should be maximum {#limit} characters long.',
      'any.required': 'orbitLength field is required.',
    }),
    color: Joi.string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .required()
      .messages({
        'string.pattern.base': `Color should be Hex color format (#2C1414).`,
        'string.empty': `Color cannot be an empty field`,
        'string.base': 'Color field should be string.',
        'any.required': 'color field is required.',
      }),
    biography: Joi.string()
      .regex(/[\u10A0-\u10FF]$/)
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': `Biography should be in Georgian alphabet.`,
        'string.empty': `Biography cannot be an empty field`,
        'string.base': 'Biography field should be string.',
        'any.required': 'biography field is required.',
      }),
  })
}

export default bandMemberUpdateSchema
