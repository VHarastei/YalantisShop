import { useSearchParams } from 'react-router-dom'
import { changeProductsCurrentPage, changeProductsOriginFilter } from 'store/slices/products/slice'
import { Origin, SelectOptions } from 'types'
import { useAppDispatch } from './useAppDispatch'

export const useOriginFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeOrigin = (options: SelectOptions) => {
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
