export const QuantityFilterInput = ({ name, label, min, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className='input primary-focus'
        name={name}
        type="number"
        min={min}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
