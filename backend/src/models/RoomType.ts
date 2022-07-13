import { Schema, model } from 'mongoose'
import { Room } from './Room'

export interface RoomType {
  name: string
  description: string
  price: number
  maxPeople: number
  rooms: Room[]
}

const RoomTypeSchema = new Schema<RoomType>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  rooms: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }]
  }
}, { timestamps: true })

export default model<RoomType>('RoomType', RoomTypeSchema)