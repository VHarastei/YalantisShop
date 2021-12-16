import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import cartIcon from 'assets/cart.svg'
import { useCartState } from 'state'
import clsx from 'clsx'

export const Layout: React.FC = ({ children }) => {
  const { totalProducts } = useCartState()

  return (
    <div className="flex flex-col h-full min-h-screen tracking-normal leading-normal bg-gray-200">
      <header className="fixed top-0 z-10 py-4 px-4 w-full text-white bg-green-500 shadow-sm">
        <nav className="flex justify-between mx-auto max-w-6xl">
          <Link to="/">
            <h2 className="text-3xl font-bold">The Shop</h2>
          </Link>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'invisible' : '')}>
            <button className="flex relative mr-8 hover:text-yellow-400">
              <img width={42} src={cartIcon} alt="cart icon" />
              <span
                className={clsx(
                  totalProducts < 10 ? 'left-3' : '-left-0',
                  'absolute -top-3 left-3 text-2xl font-bold text-yellow-400'
                )}
              >
                {totalProducts}
              </span>
              <span className="absolute top-3 left-9 text-xl font-semibold">Cart</span>
            </button>
          </NavLink>
        </nav>
      </header>
      <main className="px-4 mx-auto mt-20 mb-auto w-full max-w-6xl">{children}</main>
    </div>
  )
}
