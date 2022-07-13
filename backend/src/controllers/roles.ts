import { RequestHandler } from "express";
import Rol from '../models/Role'

export const createOne: RequestHandler = async (req, res, next) => {
  const data = req.body
  try {
    const roleModel = new Rol(data)
    const savedRoole = await roleModel.save()
    res.status(201).json(savedRoole)
  } catch (error) {
    next(error)
  }
}