import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Band from 'models/bandModel'

import bandRegistrationSchema from 'schemas/bandRegistrationSchema'

// @desc Register Band
// @route POST /api/band/register
// @access Private
export const registerBand = asyncHandler(
  async (req: Request, res: Response) => {
    /* Validation with Joi */
    const validator = await bandRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }
    // value from Joi
    const { text } = data

    // Create Band
    const band = await Band.create({
      text,
    })
    // back created Band id on response
    if (band) {
      res.status(201).json({
        message: 'Band registered.',
        _id: band.id,
      })
    }
  }
)
