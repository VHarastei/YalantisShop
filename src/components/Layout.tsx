import React from 'react'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-full min-h-screen tracking-normal leading-normal bg-gray-200">
      <header className="fixed top-0 z-10 py-4 px-4 w-full text-white bg-green-500 shadow-sm">
        <div className="flex justify-between mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">The Shop</h2>
          <button>Cart</button>
        </div>
      </header>
      <main className="px-4 mx-auto mt-20 mb-auto w-full max-w-6xl">{children}</main>
    </div>
  )
}
