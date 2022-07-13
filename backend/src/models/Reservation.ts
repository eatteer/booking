import { Schema, model } from 'mongoose'

export interface Reservation {
  userId: Schema.Types.ObjectId
  roomId: Schema.Types.ObjectId
  startDate: Date
  endDate: Date
}

const ReservationSchema = new Schema<Reservation>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  roomId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true })

export default model<Reservation>('Reservation', ReservationSchema)