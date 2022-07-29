import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Band from 'models/bandModel'
import mongoose from 'mongoose'
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

// @desc Update Band
// @route PUT /api/band/update/:id
// @access Private
export const updateBand = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific band from database by id
    const band = await Band.findById(req.params.id)
    if (!band) {
      res.status(400)
      throw new Error('There is no Band with this ID.')
    }
    /* Validation with Joi */
    const validator = await bandRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }

    // value from Joi
    const { text } = data

    // update band
    await Band.findByIdAndUpdate(
      req.params.id,
      {
        text,
      },
      {
        // create property if it does not exist
        new: true,
      }
    )

    // see updated band id on response
    res.status(200).json({
      message: 'Band updated.',
      _id: band.id,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})
