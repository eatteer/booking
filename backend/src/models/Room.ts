import { Schema, model } from "mongoose";

export interface Room {
  number: number
}

const RoomSchema = new Schema<Room>({
  number: {
    type: Number,
    required: true
  },
}, { timestamps: true })

export default model<Room>('Room', RoomSchema)