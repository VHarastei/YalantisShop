import clsx from 'clsx'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useGetSearchParams } from 'hooks/useGetSearchParams'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { changeProductsCurrentPage, changeProductsItemsPerPage } from 'store/slices/products/slice'
import { IPagination } from 'types'
import { createPagination } from 'utils/createPagination'

type PropsType = IPagination & {
  navLink?: string
}

export const Pagination: React.FC<PropsType> = React.memo(
  ({ navLink = '', currentPage, itemsPerPage, ...rest }) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const sp = useGetSearchParams(['origins', 'min', 'max'])

    const pagination = createPagination({
      currentPage,
      itemsPerPage,
      ...rest,
    })

    const handleChangeCurrentPage = (newPage: number) => {
      dispatch(changeProductsCurrentPage(newPage))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeProductsCurrentPage(1))
      dispatch(changeProductsItemsPerPage(+e.target.value))

      searchParams.delete('page')
      setSearchParams(searchParams)
    }

    return (
      <div className="relative w-full">
        <nav className="mt-4 text-center">
          <Link
            to={`${navLink}${
              pagination[0] === currentPage ? '' : `?page=${currentPage - 1}${sp ? `&${sp}` : ''}`
            }`}
          >
            <button
              onClick={() => handleChangeCurrentPage(currentPage - 1)}
              disabled={pagination[0] === currentPage}
              className={clsx(
                pagination[0] === currentPage && 'text-gray-400 cursor-default',
                'mr-1 w-8 h-8 text-xl font-medium hover:bg-gray-300 rounded-lg'
              )}
            >
              {'<'}
            </button>
          </Link>
          {pagination.map((page) => {
            return (
              <Link
                key={page}
                to={`${navLink}${page === 1 ? `?${sp}` : `?page=${page}${sp ? `&${sp}` : ''}`}`}
              >
                <button
                  onClick={() => handleChangeCurrentPage(page)}
                  disabled={page === currentPage}
                  className={clsx(
                    page === currentPage
                      ? 'text-white bg-green-500 hover:bg-green-600'
                      : 'text-gray-500 hover:bg-gray-300',
                    'mr-1 w-8 h-8 text-lg font-medium rounded-lg'
                  )}
                >
                  {page}
                </button>
              </Link>
            )
          })}
          <Link
            to={`${navLink}${
              pagination[pagination.length - 1] === currentPage
                ? ''
                : `?page=${currentPage + 1}${sp ? `&${sp}` : ''}`
            }`}
          >
            <button
              onClick={() => handleChangeCurrentPage(currentPage + 1)}
              disabled={pagination[pagination.length - 1] === currentPage}
              className={clsx(
                pagination[pagination.length - 1] === currentPage && 'text-gray-400 cursor-default',
                'mr-1 w-8 h-8 text-xl font-medium hover:bg-gray-300 rounded-lg'
              )}
            >
              {'>'}
            </button>
          </Link>
        </nav>
        <div className="flex absolute top-0 right-0 items-center">
          <span className="mr-2 text-lg font-semibold text-gray-500">Show items</span>
          <select
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
            className="p-1 font-medium text-gray-500 rounded-md focus:outline-green"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    )
  }
)
