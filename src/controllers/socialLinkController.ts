import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import socialLinkRegistrationSchema from 'schemas/socialLinkRegistrationSchema'
import SocialLink from 'models/socialLinkModel'

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
