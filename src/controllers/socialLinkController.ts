import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import socialLinkRegistrationSchema from 'schemas/socialLinkRegistrationSchema'
import SocialLink from 'models/socialLinkModel'
import socialLinkUpdateSchema from 'schemas/socialLinkUpdateSchema'

// @desc Register social link
// @route GET /api/social-link/register
// @access Private
export const socialLinkRegister = asyncHandler(
  async (req: Request, res: Response) => {
    /* Validation with Joi */
    const validator = await socialLinkRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }
    // value from Joi
    const { name, url } = data

    // Create Social link
    const socialLink = await SocialLink.create({
      name,
      url,
    })
    // back created link id on response
    if (socialLink) {
      res.status(201).json({
        message: 'Social Link registered.',
        _id: socialLink.id,
      })
    }
  }
)

// @desc Update Social link
// @route PUT /api/social-link/update/:id
// @access Private
export const socialLinkUpdate = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific member from database by id
    const socialLink = await SocialLink.findById(req.params.id)
    if (!socialLink) {
      res.status(400)
      throw new Error('There is no social link with this ID.')
    }
    /* Validation with Joi */
    const validator = await socialLinkUpdateSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }

    // value from Joi
    const { name, url } = data

    // update social link
    await SocialLink.findByIdAndUpdate(
      req.params.id,
      {
        name,
        url,
      },
      {
        // create property if it does not exist
        new: true,
      }
    )

    // see updated social link id on response
    res.status(200).json({
      message: 'Social link updated.',
      _id: socialLink.id,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Change social link avatar
// @route PUT /api/social-link/change-avatar/:id
// @access Private
export const socialLinkAvatarChange = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(422)
      throw new Error('Please select the file')
    }

    await SocialLink.findByIdAndUpdate(
      req.params.id,
      { avatar: `${req.file.destination}/${req.file.filename}` },
      {
        // create property if it does not exist
        new: true,
      }
    )
    res.status(201).json({
      message: 'Avatar changed.',
      path: `${req.file.destination}/${req.file.filename}`,
    })
  }
)
