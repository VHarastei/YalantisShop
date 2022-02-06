import { ErrorCard } from 'components/ErrorCard'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useDebounceFilters } from 'hooks/useDebounceFilters'
import { Pagination } from 'pages/Products/components/Pagination'
import { ProductCardPreloader } from 'pages/Products/components/ProductCardPreloader'
import { ProductsFilters } from 'pages/Products/components/ProductsFilters'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  selectProductIds,
  selectProductsFilters,
  selectProductsPagination,
  selectProductsStatus,
} from 'store/slices/products/selectors'
import { parseProductsSearchParams, resetProductsState } from 'store/slices/products/slice'
import { fetchProducts } from 'store/slices/products/thunks'
import { Status } from 'types'
import { MyProductCard } from './components/MyProductCard'

export const MyProducts = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const [isSearchParamsParsed, setIsSearchParamsParsed] = useState(false)

  const {
    page: currentPage,
    perPage: itemsPerPage,
    totalItems: numberOfItems,
  } = useAppSelector(selectProductsPagination)

  // Change logic according to HM#4
  //const { origins, minPrice, maxPrice } = useAppSelector(selectProductsFilters)
  const filters = useAppSelector(selectProductsFilters)
  const { origins, minPrice, maxPrice } = useDebounceFilters(filters, 500)

  const productIds = useAppSelector(selectProductIds)
  const status = useAppSelector(selectProductsStatus)

  useEffect(() => {
    dispatch(parseProductsSearchParams(Array.from(searchParams.entries())))
    setIsSearchParamsParsed(true)

    return () => {
      dispatch(resetProductsState())
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (isSearchParamsParsed)
      dispatch(
        fetchProducts({
          page: currentPage,
          perPage: itemsPerPage,
          origins: origins.join(','),
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          editable: true,
        })
      )
  }, [currentPage, itemsPerPage, origins, minPrice, maxPrice, isSearchParamsParsed, dispatch])

  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">List of My Products</h1>
      <ProductsFilters />

      <ul className="flex flex-wrap gap-4 justify-center">
        {status === Status.SUCCESS
          ? productIds.map((id) => <MyProductCard productId={id} key={id} />)
          : [...Array(itemsPerPage)].map((_, i) => (
              <ProductCardPreloader isMyProduct={true} key={i} />
            ))}
      </ul>

      {status === Status.SUCCESS ? (
        productIds.length ? (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            numberOfItems={numberOfItems}
            numberOfButtons={5}
          />
        ) : (
          <h1 className="mt-8 text-3xl font-semibold text-center">
            No products matching your filters were found!
          </h1>
        )
      ) : null}
    </div>
  )
}
