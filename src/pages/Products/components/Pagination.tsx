import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { IPagination } from 'types'
import { createPagination } from 'utils/createPagination'

type PropsType = IPagination & {
  navLink?: string
  changeCurrentPage: (newPage: number) => void
}

export const Pagination: React.FC<PropsType> = React.memo(
  ({ currentPage, navLink = '', changeCurrentPage, ...rest }) => {
    const pagination = createPagination({
      currentPage,
      ...rest,
    })

    return (
      <nav className="mt-4 text-center">
        <Link to={`${navLink}${pagination[0] === currentPage ? '' : `?page=${currentPage - 1}`}`}>
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
            <Link key={page} to={`${navLink}${page === 1 ? '' : `?page=${page}`}`}>
              <button
                onClick={() => changeCurrentPage(page)}
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
            pagination[pagination.length - 1] === currentPage ? '' : `?page=${currentPage + 1}`
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
    )
  }
)
