import { useSearchContext } from '../../../../context/SearchContext'
import { calculateNights } from '../../../../utils/calculateNights'
import styles from './RoomType.module.css'

const RoomType = ({ roomType, onChangeSelectRoom }) => {
  const { dateRange } = useSearchContext()
  const nights = calculateNights(dateRange)

  return (
    <div key={roomType._id} className={styles.room}>
      <div>
        <h3 className={styles.title}>{roomType.name}</h3>
        <p>{roomType.description}</p>
        <p className={styles.maxPeople}>Max people: {roomType.maxPeople}</p>
        <p>${roomType.price}</p>
        <p className={styles.price}>
          {nights}
          {nights > 1 ? ' nights ' : ' night '}
          for ${nights * roomType.price}</p>
      </div>
      <div className={styles.roomTypes}>
        {roomType.rooms.map(room => {
          return (
            <div key={room._id} className={styles.roomType}>
              <label htmlFor="room">{room.number}</label>
              <input
                name="room"
                type="checkbox"
                disabled={room.isBooked}
                value={room._id}
                onChange={onChangeSelectRoom}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoomType