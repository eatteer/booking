import { RequestHandler } from "express"
import Stay from "../models/Stay"
import RoomType from "../models/RoomType"

export const createOne: RequestHandler = async (req, res, next) => {
  /* Extract stay id and incoming room data for room creation */
  const { stayId, ...incomingRoomData } = req.body
  const room = new RoomType(incomingRoomData)
  try {
    /* Save room into database */
    const savedRoom = await room.save()
    /* Update stay where saved room belongs to by adding its id */
    await Stay.findByIdAndUpdate(
      stayId,
      { $push: { roomTypes: savedRoom._id } })
    /* Send response with saved room */
    res.status(200).json(savedRoom)
  } catch (error) {
    next(error)
  }
}

export const findAll: RequestHandler = async (req, res, next) => {
  try {
    const foundRooms = await RoomType.find()
    res.status(200).json(foundRooms)
  } catch (error) {
    next(error)
  }
}

export const findById: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundRoom = await RoomType.findById(id)
    res.status(200).json(foundRoom)
  } catch (error) {
    next(error)
  }
}

export const updateById: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const roomData = req.body
  try {
    const updatedRoom = await RoomType.findByIdAndUpdate(
      id,
      { $set: roomData },
      { new: true }
    )
    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

export const addDatesBooked: RequestHandler = async (req, res, next) => {
  /* id of roomNumber not room.
    roomsNumber are inside of room */
  const { roomNumberId } = req.params
  const { datesBooked } = req.body
  try {
    const updatedRoom = await RoomType.updateOne(
      { 'roomNumbers._id': roomNumberId },
      { $push: { 'roomNumbers.$.datesBooked': datesBooked } },
      { new: true }
    )
    res.status(200).json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

export const removeById: RequestHandler = async (req, res, next) => {
  const { hotelId, roomId } = req.params
  try {
    await RoomType.findByIdAndRemove(roomId)
    Stay.findByIdAndUpdate(
      hotelId,
      { $pull: { roomsTypes: roomId } }
    )
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}