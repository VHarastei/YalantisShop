import { Api } from 'api'
import { debounce } from 'lodash'
import React, { useMemo, useState } from 'react'
import { Theme } from 'react-select'
import AsyncSelect from 'react-select/async'
import { Origin, SelectOptions } from 'types'

export const originValues = [
  { value: 'europe', label: 'Europe' },
  { value: 'usa', label: 'USA' },
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
  onChange: (options: SelectOptions) => void
}

export const OriginSelect = ({ value = [], onChange }: PropsType) => {
  const [lastOptions, setLastOptions] = useState<SelectOptions>([])

  const loadOptions = useMemo(() => {
    return debounce(async (_, callback: (options: SelectOptions) => void) => {
      const { items } = await Api.getProductsOrigins()

      const options = items.map((i) => ({
        value: i.value,
        label: i.displayName,
      }))

      callback(options)
      setLastOptions(options)

      return options
    }, 300)
  }, [setLastOptions])

  return (
    <div>
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        value={lastOptions.filter((option) =>
          value.includes(option.value as Origin) ? option : false
        )}
        onChange={onChange}
      />
    </div>
  )
}
