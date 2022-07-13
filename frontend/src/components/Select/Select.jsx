import { useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import styles from './Select.module.css'

const Select = ({ defaultValue, options, onChange }) => {
  /* Refs */
  const stayTypesPickerRef = useRef()

  /* States */
  const [value, setValue] = useState(defaultValue)
  const [isOpenOptions, setIsOpenOptions] = useState(false)

  /* Dynamic styles */
  const optionsVisibilityStyle = isOpenOptions ? styles.isOpenOptions : ''

  /* Hooks */
  useOnClickOutside(stayTypesPickerRef, () => setIsOpenOptions(false))

  /* Handlers */
  const _toogleOpenOptions = () => {
    setIsOpenOptions(prev => !prev)
  }

  const _selectOption = (value) => {
    setValue(value)
    _toogleOpenOptions()
    onChange(value)
  }

  return (
    <div ref={stayTypesPickerRef} className={styles.container}>
      <input
        className='input primary-focus cursor-pointer'
        readOnly
        value={value ?? options[0].label}
        onClick={_toogleOpenOptions}
      />
      <div className={`${styles.options} ${optionsVisibilityStyle}`}>
        {options.map(option => {
          return (
            <div
              key={option.label}
              className={styles.option}
              onClick={() => _selectOption(option.value)}
            >
              <p>{option.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Select