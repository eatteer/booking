import { Schema, model } from 'mongoose'
import { RoomType } from './RoomType'

interface Address {
  country: string
  city: string
  location: string
  distanceFrom: string
}

export interface Stay {
  name: string
  type: string
  address: Address
  images: string[]
  rating: number
  roomTypes: RoomType[]
  cheapestPrice: number
  featured: boolean
  title: string
  description: string
}

const AddressSchema = new Schema<Address>({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  distanceFrom: {
    type: String
  }
})

const StaySchema = new Schema<Stay>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: AddressSchema,
  images: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  roomTypes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'RoomType'
    }]
  },
  cheapestPrice: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

export default model<Stay>('Stay', StaySchema)