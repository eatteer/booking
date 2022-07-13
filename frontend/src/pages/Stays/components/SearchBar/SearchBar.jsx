import { useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

/* Configs */
import { defaultFilters } from '../../../../config/defaultFilters'

/* Utils */
import { formatDateRange } from '../../../../utils/formatDateRange'

/* Contexts */
import { useSearchContext } from '../../../../context/SearchContext'

/* Hooks */
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'

/* Components */
import { QuantityFilterInput } from '../QuantityFilterInput/QuantityFilterInput'
import Select from '../../../../components/Select/Select'

/* Styles */
import styles from './SearchBar.module.css'
import { defaultRangeColors } from '../../../../config/defaultRangeColors'

const SearchBar = ({ _setDestination }) => {
  /* Consts */
  const options = [
    {
      value: undefined,
      label: 'All'
    },
    {
      value: 'Hotel',
      label: 'Hotel'
    },
    {
      value: 'Apartment',
      label: 'Apartment'
    },
    {
      value: 'Resort',
      label: 'Resort'
    },
    {
      value: 'Villa',
      label: 'Villa'
    },
    {
      value: 'Cabin',
      label: 'Cabin'
    },
  ]

  /* Refs */
  const dateRangePickerRef = useRef()

  /* States */
  const [isOpenDateRangePicker, setIsOpenDateRangePicker] = useState(false)

  /* Hooks */
  useOnClickOutside(dateRangePickerRef, () => setIsOpenDateRangePicker(false))

  const {
    destination,
    type,
    dateRange,
    filters,
    setDestination,
    setType,
    setDateRange,
    setFilters
  } = useSearchContext()

  /* Utils */
  const { initialDate, endDate } = formatDateRange(dateRange)

  /* Handlers */
  const _onChangeDestination = (event) => {
    const { value } = event.target
    setDestination(value.trim())
  }

  const _toggleOpenDateRangePicker = () => {
    setIsOpenDateRangePicker(prev => !prev)
  }

  const _onChangeFilters = (event) => {
    const { value, name } = event.target
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        [name]: Number(value)
      }
      return updatedFilters
    })
  }

  const _submit = (event) => {
    event.preventDefault()
    _setDestination(destination)
  }

  return (
    <form
      className={styles.container}
      onSubmit={_submit}
    >
      <div>
        <p>Destination</p>
        <input
          className='input primary-focus'
          name='destination'
          type="text"
          value={destination}
          onChange={_onChangeDestination}
          required
        />
      </div>

      <div>
        <p>Type</p>
        <Select
          defaultValue={type}
          options={options}
          onChange={(value) => setType(value)}
        />
      </div>


      <div
        ref={dateRangePickerRef}
        className={`${styles.rangeDatePickerContainer} cursor-pointer`}
      >
        <label>Check-in date</label>
        <p onClick={_toggleOpenDateRangePicker}>{initialDate} to {endDate}</p>
        {/* Conditionally render range date picker */}
        {isOpenDateRangePicker && (
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

      <div className={styles.row}>
        <QuantityFilterInput
          name='minPrice'
          label='Min price'
          value={filters.minPrice}
          onChange={_onChangeFilters}
        />
        <QuantityFilterInput
          name='maxPrice'
          label='Max price'
          value={filters.maxPrice}
          onChange={_onChangeFilters}
        />
      </div>
      <div className={styles.row}>
        <QuantityFilterInput
          name='adultsQuantity'
          label='Adults'
          min={defaultFilters.adultsQuantity}
          value={filters.adultsQuantity}
          onChange={_onChangeFilters}
        />
        <QuantityFilterInput
          name='childrenQuantity'
          label='Children'
          min={defaultFilters.childrenQuantity}
          value={filters.childrenQuantity}
          onChange={_onChangeFilters}
        />
        <QuantityFilterInput
          name='roomsQuantity'
          label='Rooms'
          min={defaultFilters.roomsQuantity}
          value={filters.roomsQuantity}
          onChange={_onChangeFilters}
        />
      </div>
      <input
        className='button primary'
        type={'submit'}
        value='Search'
      />
    </form>
  )
}

export default SearchBar