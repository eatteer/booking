import { IoAirplane, IoBed, IoCar } from 'react-icons/io5'
import { MdLocalTaxi, MdOutlineAttractions } from 'react-icons/md'
import styles from './Services.module.css'

const Services = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.active}`}>
        <IoBed size={24} />
        Stays
      </div>
      <div className={`${styles.item}`}>
        <IoAirplane size={24} />
        Flights
      </div>
      <div className={`${styles.item}`}>
        <IoCar size={24} />
        Car rentals
      </div>
      <div className={`${styles.item}`}>
        <MdOutlineAttractions size={24} />
        Attractions
      </div>
      <div className={`${styles.item}`}>
        <MdLocalTaxi size={24} />
        Airport taxis
      </div>
    </div>
  )
}

export default Services