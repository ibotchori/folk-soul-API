import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import BandMember from 'models/bandMemberModel'
import bandMemberRegistrationSchema from 'schemas/bandMemberRegistrationSchema'
import mongoose from 'mongoose'
import bandMemberUpdateSchema from 'schemas/bandMemberUpdateSchema'

// @desc Register member
// @route GET /api/band-member/register
// @access Private
export const registerMember = asyncHandler(
  async (req: Request, res: Response) => {
    /* Validation with Joi */
    const validator = await bandMemberRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }
    // value from Joi
    const { name, instrument, orbitLength, color, biography } = data

    // Create Member
    const member = await BandMember.create({
      name,
      instrument,
      orbitLength,
      color,
      biography,
    })
    // back created member id on response
    if (member) {
      res.status(201).json({
        message: 'Member registered.',
        _id: member.id,
      })
    }
  }
)

// @desc Change member avatar
// @route PUT /api/band-member/change-avatar/:id
// @access Private
export const changeMemberAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(422)
      throw new Error('Please select the file')
    }

    await BandMember.findByIdAndUpdate(
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

// @desc Update Member
// @route PUT /api/band-member/update/:id
// @access Private
export const updateMember = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific member from database by id
    const member = await BandMember.findById(req.params.id)
    if (!member) {
      res.status(400)
      throw new Error('There is no member with this ID.')
    }
    /* Validation with Joi */
    const validator = await bandMemberUpdateSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }

    // value from Joi
    const { name, instrument, orbitLength, color, biography } = data

    // update member
    await BandMember.findByIdAndUpdate(
      req.params.id,
      {
        name,
        instrument,
        orbitLength,
        color,
        biography,
      },
      {
        // create property if it does not exist
        new: true,
      }
    )

    // see updated member id on response
    res.status(200).json({
      message: 'Member updated.',
      _id: member.id,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Delete member
// @route DELETE /api/band-member/delete/:id
// @access Private
export const deleteMember = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific member from database by id
    const member = await BandMember.findById(req.params.id)
    if (!member) {
      res.status(400)
      throw new Error('No member found with this id.')
    }
    // remove member from database
    await member.remove()
    // see removed member id response
    res.status(200).json({
      message: 'Member deleted',
      _id: req.params.id,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Get specific member info
// @route GET /api/band-member/get/:id
// @access Private
export const getMember = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific member from database by id
    const member = await BandMember.findById(req.params.id)
    if (!member) {
      res.status(400)
      throw new Error('No member found with this id.')
    }

    // show member on response
    res.status(200).json(member)
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Get all registered members
// @route GET /api/band-member/getall
// @access Public
export const getAllMembers = asyncHandler(async (req, res) => {
  const allMembers = await BandMember.find()
  if (!allMembers) {
    res.status(400)
    throw new Error('No members found.')
  }
  // show member on response
  res.status(200).json(allMembers)
})
