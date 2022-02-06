import { Button } from 'components/Button'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useOriginFilter } from 'hooks/useOriginFilter'
import { usePriceFilter } from 'hooks/usePriceFilter'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { selectProductsFilters } from 'store/slices/products/selectors'
import { changeProductsCurrentPage, clearProductsFilters } from 'store/slices/products/slice'
import { OriginSelect } from './OriginSelect'

export const ProductsFilters = () => {
  const dispatch = useAppDispatch()
  const [, setSearchParams] = useSearchParams()

  const filters = useAppSelector(selectProductsFilters)

  const { handleChangeOrigin } = useOriginFilter()
  const { minPrice, maxPrice, ...priceFilter } = usePriceFilter(filters.minPrice, filters.maxPrice)

  const handleClearAllFilters = () => {
    setSearchParams({})
    dispatch(clearProductsFilters())
    dispatch(changeProductsCurrentPage(1))
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-4xl font-semibold text-green-500">Filters</h2>
        <Button className="px-12 text-2xl" onClick={handleClearAllFilters}>
          Clear all
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <Paper className="w-full">
          <h3 className="mb-4 text-2xl font-semibold text-green-500">Price</h3>
          <div className="flex">
            <input
              value={minPrice === 0 ? '' : minPrice}
              onChange={priceFilter.handleChangeMinPrice}
              // Change logic according to HM#4
              //onBlur={priceFilter.validateMinPrice}
              className="px-2 w-1/2 rounded-md border-1 border-gray-300 hover:border-gray-400 transition-all focus:outline-green"
            />
            <span className="mx-4 font-bold leading-10 text-gray-500">—</span>
            <input
              value={maxPrice === 0 ? '' : maxPrice}
              onChange={priceFilter.handleChangeMaxPrice}
              // Change logic according to HM#4
              //onBlur={priceFilter.validateMaxPrice}
              className="px-2 w-1/2 rounded-md border-1 border-gray-300 hover:border-gray-400 transition-all focus:outline-green"
            />
          </div>
        </Paper>
        <Paper className="w-full">
          <h3 className="mb-4 text-2xl font-semibold text-green-500">Origin</h3>
          <OriginSelect onChange={handleChangeOrigin} value={filters.origins} />
        </Paper>
      </div>
    </div>
  )
}
