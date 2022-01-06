import clsx from 'clsx'
import { useGetSearchParams } from 'hooks/useGetSearchParams'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IPagination } from 'types'
import { createPagination } from 'utils/createPagination'

type PropsType = IPagination & {
  navLink?: string
  changeCurrentPage: (newPage: number) => void
  setItemsPerPage: (newVal: number) => void
}

export const Pagination: React.FC<PropsType> = React.memo(
  ({ currentPage, itemsPerPage, navLink = '', changeCurrentPage, setItemsPerPage, ...rest }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const sp = useGetSearchParams(['origins', 'min', 'max'])

    const pagination = createPagination({
      currentPage,
      itemsPerPage,
      ...rest,
    })

    const handleChangeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(+e.target.value)
      changeCurrentPage(1)

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
              onClick={() => changeCurrentPage(currentPage - 1)}
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
                  onClick={() => changeCurrentPage(page)}
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
              onClick={() => changeCurrentPage(currentPage + 1)}
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
