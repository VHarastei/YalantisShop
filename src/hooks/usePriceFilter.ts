import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePriceFilter = (callback: () => void) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('min')) || 0)
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('max')) || 0)

  const changePrice = (cb: (value: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value === '' ? 0 : parseInt(e.target.value)

      if (!isNaN(val)) {
        cb(val)
      }
    }
  }

  const handleChangeMinPrice = changePrice((val) => setMinPrice(val))
  const handleChangeMaxPrice = changePrice((val) => setMaxPrice(val))

  const validateMinPrice = () => {
    if (minPrice > maxPrice && maxPrice !== 0) {
      setMinPrice(maxPrice)
    }
  }

  const validateMaxPrice = () => {
    if (minPrice > maxPrice && minPrice !== 0) {
      setMaxPrice(minPrice)
    }
  }

  const applyPriceFilters = () => {
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('page')

    if (minPrice > 0) {
      searchParams.append('min', minPrice.toString())
    }

    if (maxPrice > 0) {
      searchParams.append('max', maxPrice.toString())
    }

    setSearchParams(searchParams)
    callback()
  }

  return {
    minPrice,
    maxPrice,
    handleChangeMinPrice,
    handleChangeMaxPrice,
    validateMinPrice,
    validateMaxPrice,
    applyPriceFilters,
  }
}
