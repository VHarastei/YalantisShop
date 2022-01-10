import { useSearchParams } from 'react-router-dom'
import { MultiValue } from 'react-select'
import { changeProductsCurrentPage, changeProductsOriginFilter } from 'store/slices/products/slice'
import { Origin } from 'types'
import { useAppDispatch } from './useAppDispatch'

export const useOriginFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeOrigin = (options: MultiValue<{ value: string; label: string }>) => {
    const newOrigins = options.map((o) => o.value as Origin)

    searchParams.delete('origins')
    searchParams.delete('page')

    if (newOrigins.length) {
      searchParams.append('origins', newOrigins.join(','))
    }
    setSearchParams(searchParams)

    dispatch(changeProductsOriginFilter(newOrigins))
    dispatch(changeProductsCurrentPage(1))
  }

  return { handleChangeOrigin }
}
