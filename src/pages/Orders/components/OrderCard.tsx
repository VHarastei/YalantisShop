import { Paper } from 'components/Paper'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import { IOrder } from 'types'
import { OrderPieceCard } from './OrderPieceCard'

type PropsType = IOrder & { isExended?: boolean }

export const OrderCard = ({ id, createdAt, pieces, isExended = false }: PropsType) => {
  return (
    <Paper>
      {!isExended && (
        <div className="flex justify-between">
          <Link to={`/orders/${id}`}>
            <h2 className="mb-2 text-2xl font-semibold hover:text-green-500 hover:underline">
              {`Order #${id.slice(0, 13)}...`}
            </h2>
          </Link>
          <span className="text-xl font-medium text-gray-500">
            {format(parseISO(createdAt), 'd.MM.yyyy')}
          </span>
        </div>
      )}
      <div className="rounded-lg border-1 border-gray-300">
        {pieces.map((piece) => (
          <OrderPieceCard {...piece} key={piece.id} />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <span className="text-xl text-gray-500">Total:</span>
        <span className="text-xl font-semibold">{`${pieces.reduce(
          (acc, curr) => acc + curr.product.price * curr.count,
          0
        )}$`}</span>
      </div>
    </Paper>
  )
}
