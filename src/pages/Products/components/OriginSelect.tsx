import React from 'react'
import Select, { MultiValue } from 'react-select'
import { Origin } from 'types'

const data = [
  { value: 'europe', label: 'Europe' },
  { value: 'usa', label: 'Usa' },
  { value: 'africa', label: 'Africa' },
  { value: 'asia', label: 'Asia' },
]

type PropsType = {
  defaultValue?: Origin[]
  onChange: (
    options: MultiValue<{
      value: string
      label: string
    }>
  ) => void
}

export const OriginSelect: React.FC<PropsType> = ({ defaultValue = [], onChange }) => {
  const defValue: typeof data = data.filter((item) =>
    defaultValue.includes(item.value as Origin) ? item : false
  )

  return (
    <Select
      isMulti
      name="origin"
      options={data}
      classNamePrefix="select"
      defaultValue={defValue}
      onChange={onChange}
      theme={(theme) => ({ ...theme })}
    />
  )
}
