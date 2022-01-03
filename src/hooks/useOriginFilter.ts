import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MultiValue } from 'react-select'
import { Origin } from 'types'

export const useOriginFilter = (callback: () => void) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [origins, setOrigins] = useState<Origin[]>(
    (searchParams.get('origins')?.split(',') as Origin[]) || []
  )

  const handleChangeOrigin = (options: MultiValue<{ value: string; label: string }>) => {
    const newOrigins = options.map((o) => o.value as Origin)

    searchParams.delete('origins')
    searchParams.delete('page')

    if (newOrigins.length) {
      searchParams.append('origins', newOrigins.join(','))
    }
    setSearchParams(searchParams)
    setOrigins(newOrigins)
    callback()
  }

  return { origins, handleChangeOrigin }
}
