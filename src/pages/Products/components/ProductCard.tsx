import React from 'react'
import { IProduct } from 'types'
import originIcon from 'assets/origin.svg'
import editIcon from 'assets/edit.svg'
import { Link } from 'react-router-dom'
import { Button } from 'components/Button'

export const ProductCard: React.FC<IProduct> = ({ id, name, price, origin, isEditable }) => {
  return (
    <li className="p-4 w-full max-w-s bg-white rounded-lg">
      <Link to={`products/${id}`}>
        <h2 className="mb-2 text-2xl font-semibold hover:text-green-500 hover:underline">{name}</h2>
      </Link>
      <div className="flex items-center mb-2">
        <img
          src={originIcon}
          width={32}
          alt="origin icon"
          className="p-1 h-8 bg-green-500 rounded-lg"
        />
        <span className="mx-2 text-lg font-medium text-gray-500">Origin:</span>
        <span className="text-lg font-medium">{origin[0].toUpperCase() + origin.slice(1)}</span>
      </div>
      <div className="flex items-center mb-2">
        <img
          src={editIcon}
          width={32}
          alt="origin icon"
          className="p-1 h-8 bg-green-500 rounded-lg"
        />
        <span className="mx-2 text-lg font-medium text-gray-500">Editable:</span>
        <span className="text-lg font-medium">{isEditable ? 'Yes' : 'No'}</span>
      </div>
      <div className="mb-2">
        <span className="mr-2 text-xl font-medium text-gray-500">Price:</span>
        <span className="text-3xl font-medium">{`${price}$`}</span>
      </div>
      <Button fullWidth>Add to Cart</Button>
    </li>
  )
}
