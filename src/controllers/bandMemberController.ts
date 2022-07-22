import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import BandMember from 'models/bandMemberModel'
import bandMemberRegistrationSchema from 'schemas/bandMemberRegistrationSchema'

export const bandMemberRegister = asyncHandler(
  async (req: Request, res: Response) => {
    /* Validation with Joi */
    const validator = await bandMemberRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      //  return res.status(422).json(error.details)
      res.status(422)
      throw new Error(error.details[0].message)
    }
    // value from Joi
    const { name, instrument, orbitLength, color, biography } = data

    // Create User
    const member = await BandMember.create({
      name,
      instrument,
      orbitLength,
      color,
      biography,
    })
    // back user information on response
    if (member) {
      res.status(201).json({
        message: 'Member is registered.',
        _id: member.id,
      })
    }
  }
)
