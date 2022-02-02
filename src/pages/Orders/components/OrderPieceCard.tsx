import { Link } from 'react-router-dom'
import { IOrderPiece } from 'types'

export const OrderPieceCard = ({ count, product }: IOrderPiece) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 border-b-1 last:border-b-0 border-gray-300">
      <Link to={`/products/${product.id}`}>
        <h2 className="text-xl font-medium hover:text-green-500 hover:underline break-normal">
          {product.name}
        </h2>
      </Link>
      <div className="flex justify-around w-4/6">
        <div className="w-1/6 text-center">
          <span className="text-gray-500">Price</span>
          <p className="text-lg font-medium">{`${product.price}$`}</p>
        </div>
        <div className="w-1/6 text-center">
          <span className="text-gray-500">Quantity</span>
          <p className="text-lg font-medium">{count}</p>
        </div>
        <div className="w-1/6 text-center">
          <span className="text-gray-500">Total</span>
          <p className="text-lg font-medium">{`${count * product.price}$`}</p>
        </div>
      </div>
    </div>
  )
}
