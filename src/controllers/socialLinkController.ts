import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import socialLinkRegistrationSchema from 'schemas/socialLinkRegistrationSchema'
import SocialLink from 'models/socialLinkModel'
import socialLinkUpdateSchema from 'schemas/socialLinkUpdateSchema'

// @desc Register social link
// @route POST /api/social-link/register
// @access Private
export const registerSocialLink = asyncHandler(
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
export const updateSocialLink = asyncHandler(async (req, res) => {
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
// @route POST /api/social-link/change-avatar/:id
// @access Private
export const changeSocialLinkAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    // validate ObjectID with mongoose
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      // get specific social link from database by id
      const socialLink = await SocialLink.findById(req.params.id)
      if (!socialLink) {
        res.status(400)
        throw new Error('No Social Link found with this id.')
      }

      if (!req.file) {
        res.status(422)
        throw new Error('Please select the file')
      }

      await SocialLink.findByIdAndUpdate(
        req.params.id,
        { avatar: `/uploads/images/${req.file.filename}` },
        {
          // create property if it does not exist
          new: true,
        }
      )
      res.status(201).json({
        message: 'Avatar changed.',
        path: `/uploads/images/${req.file.filename}`,
      })
    } else {
      res.status(422)
      throw new Error('Params should be ObjectID format.')
    }
  }
)

// @desc Delete Social link
// @route DELETE /api/social-link/delete/:id
// @access Private
export const deleteSocialLink = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific social link from database by id
    const socialLink = await SocialLink.findById(req.params.id)
    if (!socialLink) {
      res.status(400)
      throw new Error('No Social Link found with this id.')
    }
    // remove social link from database
    await socialLink.remove()
    // see removed social link id response
    res.status(200).json({
      message: 'Social Link deleted',
      _id: req.params.id,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Get specific social link info
// @route GET /api/social-link/get/:id
// @access Private
export const getSocialLink = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific social link from database by id
    const socialLink = await SocialLink.findById(req.params.id)
    if (!socialLink) {
      res.status(400)
      throw new Error('No social link found with this id.')
    }

    // show social link on response
    res.status(200).json(socialLink)
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Get all Social link
// @route GET /api/social-link/get/:id
// @access Public
export const getAllSocialLinks = asyncHandler(async (req, res) => {
  const allSocialLinks = await SocialLink.find()
  if (!allSocialLinks) {
    res.status(400)
    throw new Error('No Social link found.')
  }
  // show member on response
  res.status(200).json(allSocialLinks)
})
