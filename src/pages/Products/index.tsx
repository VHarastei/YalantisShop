import { ErrorCard } from 'components/ErrorCard'
import { Paper } from 'components/Paper'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MultiValue } from 'react-select'
import {
  fetchProducts,
  selectProductIds,
  selectProductsPagination,
  selectProductsStatus,
} from 'store/slices/productsSlice'
import { Origin, Status } from 'types'
import { OriginSelect } from './components/OriginSelect'
import { Pagination } from './components/Pagination'
import { ProductCard } from './components/ProductCard'
import { ProductCardPreloader } from './components/ProductCardPreloader'

export const Products = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [origins, setOrigins] = useState<Origin[]>(
    (searchParams.get('origins')?.split(',') as Origin[]) || []
  )

  const productIds = useAppSelector(selectProductIds)
  const status = useAppSelector(selectProductsStatus)
  const pagination = useAppSelector(selectProductsPagination)

  const changeCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, perPage: 20, origins }))
  }, [currentPage, dispatch, origins])

  const handleChangeOrigin = (options: MultiValue<{ value: string; label: string }>) => {
    const newOrigins = options.map((o) => o.value as Origin)

    setSearchParams(newOrigins.length ? { origins: newOrigins.join(',') } : {})
    setOrigins(newOrigins)
    setCurrentPage(1)
  }

  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">List of Products</h1>
      <div className="flex gap-4 mb-4">
        <Paper className="w-full">
          <h1 className="mb-4 text-2xl font-semibold text-green-500">Origin</h1>
          <OriginSelect onChange={handleChangeOrigin} defaultValue={origins} />
        </Paper>
      </div>
      <ul className="flex flex-wrap gap-4">
        {status === Status.SUCCESS
          ? productIds.map((id) => <ProductCard productId={id} key={id} />)
          : [...Array(20)].map((_, i) => <ProductCardPreloader key={i} />)}
      </ul>

      {status === Status.SUCCESS && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagination.perPage}
          numberOfItems={pagination.totalItems}
          numberOfButtons={5}
          changeCurrentPage={changeCurrentPage}
        />
      )}
    </div>
  )
}
