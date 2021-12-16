import addIcon from 'assets/add.svg'
import removeIcon from 'assets/remove.svg'
import { Button } from 'components/Button'
import { Paper } from 'components/Paper'
import React from 'react'
import { IProductWithQuantity, useCartDispatch, useCartState } from 'state'
import { IProduct } from 'types'

export const Cart = () => {
  const { products, totalProducts } = useCartState()
  const dispatch = useCartDispatch()

  const hadleAddProduct = (payload: IProduct) => {
    dispatch({ type: 'ADD_PRODUCT', payload })
  }

  const hadleRemoveProduct = (payload: IProductWithQuantity) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload })
  }

  const handleClearProducts = () => {
    dispatch({ type: 'CLEAR_PRODUCTS' })
  }

  return (
    <div className="flex gap-4 w-full">
      <div className="w-full">
        <h1 className="mb-4 text-3xl font-bold text-center text-green-500">Shopping Cart</h1>
        {products.length ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Paper className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold hover:text-green-500 hover:underline">
                      {product.name}
                    </h2>
                    <div className="mb-2">
                      <span className="mr-2 text-xl font-medium text-gray-500">Price:</span>
                      <span className="text-3xl font-medium">{`${product.price}$`}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-xl font-medium text-gray-500">Quantity:</span>
                    <div className="flex items-center">
                      <Button onClick={() => hadleRemoveProduct(product)}>
                        <img src={removeIcon} alt="remove icon" />
                      </Button>
                      <h1 className="w-8 text-3xl font-semibold text-center">{product.quantity}</h1>
                      <Button className="p-0" onClick={() => hadleAddProduct(product)}>
                        <img src={addIcon} alt="add icon" />
                      </Button>
                    </div>
                  </div>
                </Paper>
              </li>
            ))}
          </ul>
        ) : (
          <Paper className="text-2xl font-semibold">Your Cart is empty.</Paper>
        )}
      </div>
      <div className="w-full max-w-xs">
        <h1 className="mb-4 text-3xl font-bold text-center text-green-500">Total</h1>
        <Paper>
          <div className="mb-2">
            <span className="mr-2 text-2xl font-medium text-gray-500">{`Total (${totalProducts} items):`}</span>
            <span className="text-3xl font-semibold">
              {`${products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}$`}
            </span>
          </div>
          <Button onClick={handleClearProducts} fullWidth>
            Proceed to checkout
          </Button>
        </Paper>
      </div>
    </div>
  )
}
