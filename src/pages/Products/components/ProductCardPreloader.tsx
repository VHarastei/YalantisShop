import React from 'react'

export const ProductCardPreloader = ({ isMyProduct = false }) => {
  return (
    <li className="p-4 w-full max-w-s bg-white rounded-lg">
      <div className="mb-2 h-8 text-2xl font-semibold hover:text-green-500 hover:underline shimmer" />
      <div className="flex items-center mb-2 w-1/2 h-8 shimmer" />
      {!isMyProduct && <div className="flex items-center mb-2 w-1/2 h-8 shimmer" />}
      <div className="mb-2 w-1/3 h-9 shimmer" />
      <div className="p-2 w-full h-11 text-xl shimmer" />
    </li>
  )
}
