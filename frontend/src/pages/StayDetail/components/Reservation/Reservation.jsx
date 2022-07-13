import { useState } from 'react'
import { useSearchContext } from '../../../../context/SearchContext'
import RoomType from '../RoomType/RoomType'
import styles from './Reservation.module.css'
import { useQuery, useQueryClient } from 'react-query'
import { getRoomsStatus } from '../../../../services/stays'
import { reserveRoom } from '../../../../services/reservations'
import { useAuthContext } from '../../../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Reservation = ({ stay }) => {
  /* States */
  const [selectedRooms, setSelectedRooms] = useState([])

  /* Hooks */
  const location = useLocation()
  const navigate = useNavigate()
  const { accessToken } = useAuthContext()
  const { dateRange } = useSearchContext()

  const _dateRange = {
    startDate: dateRange[0].startDate.getTime(),
    endDate: dateRange[0].endDate.getTime()
  }

  const queryClient = useQueryClient()
  const { data } = useQuery(['roomsStatus', stay._id], () => getRoomsStatus(stay._id, _dateRange))

  /* Handlers */
  const _onChangeSelectRoom = (event) => {
    const { checked, value } = event.target
    setSelectedRooms((prev) =>
      checked
        ? [...prev, value]
        : prev.filter(room => room !== value)
    )
  }

  const _submit = async (event) => {
    event.preventDefault()
    if (!accessToken) {
      return navigate('/login', { state: { from: location } })
    }
    try {
      await Promise.all(selectedRooms.map(async selectedIdRoom => {
        return await reserveRoom(accessToken, selectedIdRoom, _dateRange)
      }))
      toast.success('Booked!')
      setSelectedRooms([])
      queryClient.invalidateQueries(['roomsStatus'])

    } catch (error) {
      toast.error('Something went wrong. We could not book')
      console.error(error)
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={_submit}
    >
      {data && (
        <div className={styles.rooms}>
          {data.roomTypes.map(roomType => {
            return (
              <RoomType
                key={roomType._id}
                roomType={roomType}
                onChangeSelectRoom={_onChangeSelectRoom}
              />
            )
          })}
        </div>
      )}
      <input
        className='button primary w-full'
        type="submit"
        value="Book now"
      />
    </form>
  )
}

export default Reservation