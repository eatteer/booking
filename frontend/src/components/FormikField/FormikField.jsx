import { useField } from 'formik'
import React from 'react'

const FormikField = ({ name, label, ...restProps }) => {
  const [field, meta, helpers] = useField(name)

  const _getErrorStyle = () => {
    return meta.error && meta.touched ? 'error' : ''
  }

  return (
    <div>
      <input
        className={`input primary ${_getErrorStyle()}`}
        {...field}
        {...restProps}
      />
    </div>
  )
}

export default FormikField