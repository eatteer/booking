import { RequestHandler } from "express";
import Reservation from '../models/Reservation'

export const createOne: RequestHandler = async (req, res, next) => {
  const userId = req.accessTokenPayload!._id
  const data = { ...req.body, userId }
  try {
    const reservationModel = new Reservation(data)
    const savedReservation = await reservationModel.save()
    res.status(201).json(savedReservation)
  } catch (error) {
    next(error)
  }
}

export const findAll: RequestHandler = async (req, res, next) => {
  try {
    const foundReservations = await Reservation.find()
    res.status(200).json(foundReservations)
  } catch (error) {
    next(error)
  }
}