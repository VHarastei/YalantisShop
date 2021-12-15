import { Api } from 'api'
import { useQuery } from 'hooks/useQuery'
import React, { useCallback, useEffect, useState } from 'react'
import { IProductsWithPagination } from 'types'
import { Pagination } from './components/Pagination'
import { ProductCard } from './components/ProductCard'
import { ProductCardPreloader } from './components/ProductCardPreloader'

export const Products = () => {
  const query = useQuery()

  const [currentPage, setCurrentPage] = useState<number>(Number(query.get('page')) || 1)
  const [isError, setIsError] = useState(false)
  const [products, setProducts] = useState<IProductsWithPagination | null>(null)

  const changeCurrentPage = useCallback((newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getProducts = useCallback(async () => {
    try {
      const res = await Api.getProducts({ page: currentPage, perPage: 20 })
      setProducts(res)
    } catch (err) {
      setIsError(true)
    }
  }, [currentPage])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  if (isError)
    return (
      <div className="flex justify-center items-center mt-28">
        <h1 className="text-4xl font-semibold text-green-500">Oops! Something went wrong...</h1>
      </div>
    )

  return (
    <div className="mb-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-green-500">List of Products</h1>
      <ul className="flex flex-wrap gap-4 justify-center">
        {products
          ? products.items.map((prod) => <ProductCard {...prod} key={prod.id} />)
          : [...Array(20)].map((_, i) => <ProductCardPreloader key={i} />)}
      </ul>
      {products && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={products.perPage}
          numberOfItems={products.totalItems}
          numberOfButtons={5}
          changeCurrentPage={changeCurrentPage}
        />
      )}
    </div>
  )
}
