import { Origin } from 'types'
import { useDebounce } from 'use-debounce/lib'

export const useDebounceFilters = (
  { origins, minPrice, maxPrice }: { origins: Origin[]; minPrice: number; maxPrice: number },
  ms: number
) => {
  const [debOrigins] = useDebounce(origins, ms)
  const [debMinPrice] = useDebounce(minPrice, ms)
  const [debMaxPrice] = useDebounce(maxPrice, ms)

  return { origins: debOrigins, minPrice: debMinPrice, maxPrice: debMaxPrice }
}
