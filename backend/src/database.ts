import mongoose from 'mongoose'

export const connectMongoDb = async () => {
  try {
    const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING as string
    await mongoose.connect(MONGODB_CONNECTION_STRING)
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('connected', () => {
  console.error('mongodb connected')
})

mongoose.connection.on('disconnected', () => {
  console.error('mongodb disconnected')
})
