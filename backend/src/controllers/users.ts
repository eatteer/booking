import { RequestHandler } from "express";
import User from "../models/User";

export const findAll: RequestHandler = async (req, res, next) => {
  try {
    const foundUsers = await User.find().populate('roles')
    res.status(200).json(foundUsers)
  } catch (error) {
    next(error)
  }
}

export const findById: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  try {
    const foundUser = await User.findById(userId)
    res.status(200).json(foundUser)
  } catch (error) {
    next(error)
  }
}

export const updateById: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  const userData = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const removeById: RequestHandler = async (req, res, next) => {
  const userId = req.params.id
  try {
    await User.findByIdAndRemove(userId)
  } catch (error) {
    next(error)
  }
}