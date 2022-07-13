import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-date-range'

/* Utils */
import { formatDateRange } from '../../../../utils/formatDateRange'

/* Components - Hooks */
import { useSearchContext } from '../../../../context/SearchContext'
import Quantifier, { useQuantifier } from '../../../Quantifier/Quantifier'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'

/* Icons */
import { IoBed, IoCalendar, IoPerson } from 'react-icons/io5'

/* Styles */
import styles from './SearchBar.module.css'
import { generateFiltersText } from '../../../../utils/generateFiltersText'
import { defaultFilters } from '../../../../config/defaultFilters'
import { defaultRangeColors } from '../../../../config/defaultRangeColors'

const SearchBar = () => {
  const dateRangePickerRef = useRef()
  const filtersRef = useRef()

  /* States */
  const [isOpenRangeDatePicker, setIsOpenRangeDatePicker] = useState(false)
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  /* Hooks */
  const navigate = useNavigate()

  const {
    destination,
    dateRange,
    filters,
    setDestination,
    setDateRange,
    setFilters
  } = useSearchContext()

  const {
    quantity: adultsQuantity,
    increment: incrementAdults,
    decrement: decrementAdults
  } = useQuantifier(
    filters.adultsQuantity,
    defaultFilters.adultsQuantity
  )

  const {
    quantity: childrenQuantity,
    increment: incrementChildren,
    decrement: decrementChildren
  } = useQuantifier(
    filters.childrenQuantity,
    defaultFilters.childrenQuantity
  )

  const {
    quantity: roomsQuantity,
    increment: incrementRooms,
    decrement: decrementRooms
  } = useQuantifier(
    filters.roomsQuantity,
    defaultFilters.roomsQuantity
  )

  /* Consts */
  const { initialDate, endDate } = formatDateRange(dateRange)
  const filtersText = generateFiltersText(filters)

  /* Effects */
  useEffect(() => {
    setFilters((prevState) => {
      return {
        ...prevState,
        adultsQuantity,
        childrenQuantity,
        roomsQuantity
      }
    })
  }, [adultsQuantity, childrenQuantity, roomsQuantity, setFilters])

  /* Handlers */
  const _onChangeDestination = (event) => {
    const { value } = event.target
    setDestination(value.trim())
  }

  const _openRangeDatePicker = () => {
    console.log('onClick')
    setIsOpenRangeDatePicker(prev => !prev)
  }

  const _openFilters = () => {
    setIsOpenFilters(prev => !prev)
  }

  const _submit = (event) => {
    event.preventDefault()
    const url = '/stays'
    navigate(url)
  }

  useOnClickOutside(dateRangePickerRef, () => setIsOpenRangeDatePicker(false));
  useOnClickOutside(filtersRef, () => setIsOpenFilters(false));

  return (
    <form
      className={styles.searchBar}
      onSubmit={_submit}
    >
      {/* Search input */}
      <div className={styles.barItem}>
        <span className={styles.itemIcon}>
          <IoBed />
        </span>
        <input
          className='input primary-focus'
          type={'text'}
          placeholder={'Where are you going?'}
          value={destination}
          onChange={_onChangeDestination}
          required
        />
      </div>

      {/* Range Date Picker */}
      <div
        ref={dateRangePickerRef}
        className={`${styles.barItem} cursor-pointer`}
      >
        <span className={styles.itemIcon}>
          <IoCalendar />
        </span>
        <p onClick={_openRangeDatePicker}>{initialDate} to {endDate}</p>
        {/* Conditionally render range date picker */}
        {isOpenRangeDatePicker && (
          <DateRange
            className={styles.rangeDatePicker}
            minDate={new Date()}
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={defaultRangeColors}
          />
        )}
      </div>

      {/* Options */}
      <div
        ref={filtersRef}
        className={`${styles.barItem} cursor-pointer`}
      >
        <span className={styles.itemIcon}>
          <IoPerson />
        </span>
        <p onClick={_openFilters}>{filtersText}</p>
        {/* Conditionally render options */}
        {isOpenFilters && (
          <div className={styles.filters}>
            <div className={styles.filterItem}>
              <p>Adults</p>
              <Quantifier
                quantity={adultsQuantity}
                increment={incrementAdults}
                decrement={decrementAdults}
              />
            </div>
            <div className={styles.filterItem}>
              <p>Children</p>
              <Quantifier
                quantity={childrenQuantity}
                increment={incrementChildren}
                decrement={decrementChildren}
              />
            </div>
            <div className={styles.filterItem}>
              <p>Rooms</p>
              <Quantifier
                quantity={roomsQuantity}
                increment={incrementRooms}
                decrement={decrementRooms}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search button */}
      <div className={styles.barItem}>
        <input
          className='button primary w-full'
          type={'submit'}
          value='Search'
        />
      </div>
    </form>
  )

}

export default SearchBar