import { RequestHandler } from "express"
import RoomType from "../models/RoomType"
import Room from "../models/Room"

export const createOne: RequestHandler = async (req, res, next) => {
  const { roomTypeId, ...incomingRoomData } = req.body
  const room = new Room(incomingRoomData)
  try {
    const savedRoom = await room.save()
    await RoomType.findByIdAndUpdate(
      roomTypeId, 
      { $push: { rooms: savedRoom._id } })
    res.status(200).json(savedRoom)
  } catch (error) {
    next(error)
  }
}