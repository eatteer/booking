import { RequestHandler } from 'express'
import Stay from '../models/Stay'
import Room from "../models/Room"
import Reservation from "../models/Reservation"
import RoomType from '../models/RoomType'

export const createOne: RequestHandler = async (req, res, next) => {
  const stay = new Stay(req.body)
  try {
    const savedStay = await stay.save()
    res.status(201).json(savedStay)
  } catch (error) {
    next(error)
  }
}

export const findByFilters: RequestHandler = async (req, res, next) => {
  const { destination, minPrice, maxPrice, ...restFilters } = req.query

  try {
    const foundStays = await Stay.find({
      $or: [
        { 'address.country': destination },
        { 'address.city': destination }
      ],
      cheapestPrice: { $gte: minPrice, $lte: maxPrice },
      ...restFilters
    })
    res.status(200).json(foundStays)
  } catch (error) {
    next(error)
  }
}

export const findFeatured: RequestHandler = async (req, res, next) => {
  try {
    const foundStays = await Stay.find({ featured: true }).limit(4)
    res.status(200).json(foundStays)
  } catch (error) {
    next(error)
  }
}

export const findRoomsStatus: RequestHandler = async (req, res, next) => {
  const stayId = req.params.id
  const { startDate, endDate } = req.body
  try {
    const foundStay = await Stay.findById(stayId)

    /* RoomTypes loop */
    const roomTypes = await Promise.all<any>(
      foundStay?.roomTypes.map(async (roomType) => {
        const foundRoomType = await RoomType.findById(roomType)

        /* Rooms loop */
        const rooms = await Promise.all<any>(
          foundRoomType?.rooms.map(async (room) => {
            const foundRoom = await Room.findById(room)
            const reservation = await Reservation.findOne(
              {
                $and: [
                  { roomId: foundRoom?._id, },
                  { startDate: { $lte: startDate }, },
                  { endDate: { $gte: endDate } }
                ]
              }
            )

            return {
              ...foundRoom?.toJSON(),
              isBooked: Boolean(reservation)
            }
          })
        )

        return {
          ...foundRoomType?.toJSON(),
          rooms
        }
      })
    )

    res.status(200).json({
      ...foundStay?.toJSON(),
      roomTypes
    })
  } catch (error) {
    next(error)
  }
}

export const findById: RequestHandler = async (req, res, next) => {
  const stayId = req.params.id
  try {
    const foundStay = await Stay.findById(stayId).populate({
      path: 'roomTypes', populate: {
        path: 'rooms',
        model: 'Room'
      }
    })
    res.status(200).json(foundStay)
  } catch (error) {
    next(error)
  }
}

export const countByCity: RequestHandler = async (req, res, next) => {
  const joinedCities = req.query.cities as string
  const cities = joinedCities?.split(',')
  try {
    const counts = await Promise.all(cities.map(async (city) => {
      const count = await Stay.countDocuments({ 'address.city': city })
      return {
        city,
        count
      }
    }))
    res.status(200).json(counts)
  } catch (error) {
    next(error)
  }
}

export const countByType: RequestHandler = async (req, res, next) => {
  try {
    const hotelCount = await Stay.countDocuments({ type: 'Hotel' })
    const apartmentCount = await Stay.countDocuments({ type: 'Apartment' })
    const resortCount = await Stay.countDocuments({ type: 'Resort' })
    const villaCount = await Stay.countDocuments({ type: 'Villa' })
    const cabinCount = await Stay.countDocuments({ type: 'Cabin' })
    const counts = [
      {
        type: 'Hotel',
        count: hotelCount
      },
      {
        type: 'Apartment',
        count: apartmentCount
      },
      {
        type: 'Resort',
        count: resortCount
      },
      {
        type: 'Villa',
        count: villaCount
      },
      {
        type: 'Cabin',
        count: cabinCount
      }
    ]
    res.status(200).json(counts)
  } catch (error) {
    next(error)
  }
}

export const updateById: RequestHandler = async (req, res, next) => {
  const stayData = req.body
  const stayId = req.params.id
  try {
    const updatedHotel = await Stay.findByIdAndUpdate(
      stayId,
      { $set: stayData },
      { new: true }
    )
    res.status(200).json(updatedHotel)
  } catch (error) {
    next(error)
  }
}

export const removeById: RequestHandler = async (req, res, next) => {
  const stayId = req.params.id
  try {
    await Stay.findByIdAndRemove(stayId)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}