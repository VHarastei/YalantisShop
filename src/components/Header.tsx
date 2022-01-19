import cartIcon from 'assets/cart.svg'
import clsx from 'clsx'
import { useAppSelector } from 'hooks/useAppSelector'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { selectCartTotalProducts } from 'store/slices/cart/selectors'
import { CreateProduct } from './CreateProduct'

export const Header = () => {
  const totalProducts = useAppSelector(selectCartTotalProducts)

  return (
    <header className="fixed top-0 z-30 py-4 px-4 w-full text-white bg-green-500 shadow-sm">
      <nav className="flex justify-between items-center mx-auto max-w-6xl">
        <Link to="/">
          <h2 className="text-3xl font-bold">The Shop</h2>
        </Link>
        <div className="flex gap-4">
          <Link to="/my-products">
            <button className="text-xl font-medium opacity-80 hover:opacity-100 transition-all">
              My Products
            </button>
          </Link>
          <CreateProduct />
        </div>
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
  )
}
