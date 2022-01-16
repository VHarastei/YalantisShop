import React from 'react'
import Select, { MultiValue, Theme } from 'react-select'
import { Origin } from 'types'

export const originValues = [
  { value: 'europe', label: 'Europe' },
  { value: 'usa', label: 'Usa' },
  { value: 'africa', label: 'Africa' },
  { value: 'asia', label: 'Asia' },
]

export const ReactSelectTheme = (theme: Theme) => ({
  ...theme,
  borderRadius: 6,
  colors: {
    ...theme.colors,
    primary75: '#10B98175',
    primary50: '#10B98150',
    primary25: '#10B98125',
    primary: '#10B981',
  },
})

type PropsType = {
  value?: Origin[]
  onChange: (
    options: MultiValue<{
      value: string
      label: string
    }>
  ) => void
}

export const OriginSelect: React.FC<PropsType> = ({ value = [], onChange }) => {
  const parsedValue: typeof originValues = originValues.filter((item) =>
    value.includes(item.value as Origin) ? item : false
  )

  return (
    <Select
      isMulti
      name="origin"
      options={originValues}
      classNamePrefix="select"
      value={parsedValue}
      onChange={onChange}
      isClearable={true}
      theme={ReactSelectTheme}
    />
  )
}
