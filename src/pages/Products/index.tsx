import { Button } from 'components/Button'
import { ErrorCard } from 'components/ErrorCard'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useOriginFilter } from 'hooks/useOriginFilter'
import { usePriceFilter } from 'hooks/usePriceFilter'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  fetchProducts,
  selectProductIds,
  selectProductsPagination,
  selectProductsStatus,
} from 'store/slices/productsSlice'
import { Status } from 'types'
import { OriginSelect } from './components/OriginSelect'
import { Pagination } from './components/Pagination'
import { ProductCard } from './components/ProductCard'
import { ProductCardPreloader } from './components/ProductCardPreloader'

export const Products = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [itemsPerPage, setItemsPerPage] = useState(25)

  const { origins, handleChangeOrigin } = useOriginFilter(() => changeCurrentPage(1))
  const { minPrice, maxPrice, ...priceFilter } = usePriceFilter(() => changeCurrentPage(1))

  const productIds = useAppSelector(selectProductIds)
  const status = useAppSelector(selectProductsStatus)
  const pagination = useAppSelector(selectProductsPagination)

  const changeCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        perPage: itemsPerPage,
        origins,
        minPrice,
        maxPrice,
      })
    )
    // eslint-disable-next-line
  }, [currentPage, itemsPerPage, origins, dispatch])

  const handleUsePriceFilter = () => {
    priceFilter.applyPriceFilters()
    dispatch(
      fetchProducts({
        page: currentPage,
        perPage: itemsPerPage,
        origins,
        minPrice,
        maxPrice,
      })
    )
  }

  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">List of Products</h1>
      <div className="flex gap-4 mb-4">
        <Paper className="w-full">
          <h1 className="mb-4 text-2xl font-semibold text-green-500">Price</h1>
          <div className="flex">
            <input
              value={minPrice === 0 ? '' : minPrice}
              onChange={priceFilter.handleChangeMinPrice}
              onBlur={priceFilter.validateMinPrice}
              className="px-2 w-1/3 rounded-md border-1 border-gray-300 hover:border-gray-400 transition-all focus:outline-green"
            />
            <span className="mx-4 font-bold leading-10 text-gray-500">—</span>
            <input
              value={maxPrice === 0 ? '' : maxPrice}
              onChange={priceFilter.handleChangeMaxPrice}
              onBlur={priceFilter.validateMaxPrice}
              className="px-2 w-1/3 rounded-md border-1 border-gray-300 hover:border-gray-400 transition-all focus:outline-green"
            />
            <Button className="ml-4 w-1/3" onClick={handleUsePriceFilter}>
              Show
            </Button>
          </div>
        </Paper>
        <Paper className="w-full">
          <h1 className="mb-4 text-2xl font-semibold text-green-500">Origin</h1>
          <OriginSelect onChange={handleChangeOrigin} defaultValue={origins} />
        </Paper>
      </div>
      <ul className="flex flex-wrap gap-4 justify-center">
        {status === Status.SUCCESS
          ? productIds.map((id) => <ProductCard productId={id} key={id} />)
          : [...Array(20)].map((_, i) => <ProductCardPreloader key={i} />)}
      </ul>

      {status === Status.SUCCESS && (
        <Pagination
          currentPage={currentPage}
          numberOfItems={pagination.totalItems}
          numberOfButtons={5}
          changeCurrentPage={changeCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  )
}
