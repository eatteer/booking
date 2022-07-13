import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongoDb } from './database'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import staysRouter from './routes/stays'
import roomTypesRouter from './routes/roomTypes'
import roomsRouter from './routes/rooms'
import reservationsRouter from './routes/reservations'
import rolesRouter from './routes/roles'
import errorMiddleware from './middlewares/error'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 8800

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/stays', staysRouter)
app.use('/api/roomTypes', roomTypesRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/reservations', reservationsRouter)
app.use('/api/roles', rolesRouter)
app.use(errorMiddleware)

app.listen(PORT, async () => {
  connectMongoDb()
  console.log('listening on port ' + PORT)
})