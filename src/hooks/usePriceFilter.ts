import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  changeProductsMaxPriceFilter,
  changeProductsMinPriceFilter,
} from 'store/slices/products/slice'
import { useAppDispatch } from './useAppDispatch'

export const usePriceFilter = (min: number, max: number) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const [minPrice, setMinPrice] = useState<number>(min)
  const [maxPrice, setMaxPrice] = useState<number>(max)

  useEffect(() => {
    setMinPrice(min)
    setMaxPrice(max)
  }, [min, max])

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
    dispatch(changeProductsMinPriceFilter(minPrice))

    searchParams.delete('min')
    searchParams.delete('page')

    if (minPrice > 0) {
      searchParams.append('min', minPrice.toString())
    }
    setSearchParams(searchParams)
  }

  const validateMaxPrice = () => {
    dispatch(changeProductsMaxPriceFilter(maxPrice))

    searchParams.delete('min')
    searchParams.delete('page')

    if (maxPrice > 0) {
      searchParams.append('max', maxPrice.toString())
    }
    setSearchParams(searchParams)
  }

  return {
    minPrice,
    maxPrice,
    handleChangeMinPrice,
    handleChangeMaxPrice,
    validateMinPrice,
    validateMaxPrice,
  }
}
