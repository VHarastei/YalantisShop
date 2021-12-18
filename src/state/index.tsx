import React from 'react'
import { IProduct } from 'types'
export interface IProductWithQuantity extends IProduct {
  quantity: number
}

type Action =
  | { type: 'ADD_PRODUCT'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT'; payload: IProductWithQuantity }
  | { type: 'CLEAR_PRODUCTS' }

type Dispatch = (action: Action) => void
type State = { products: IProductWithQuantity[]; totalProducts: number }
type CartProviderProps = { children: React.ReactNode }

const CartStateContext = React.createContext<State | undefined>(undefined)
const CartDispatchContext = React.createContext<Dispatch | undefined>(undefined)

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingProduct = state.products.find((prod) => prod.id === action.payload.id)
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((prod) =>
            prod.id === existingProduct.id ? { ...prod, quantity: prod.quantity + 1 } : prod
          ),
          totalProducts: state.totalProducts + 1,
        }
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload, quantity: 1 }],
          totalProducts: state.totalProducts + 1,
        }
      }
    }
    case 'REMOVE_PRODUCT': {
      if (action.payload.quantity <= 1) {
        return {
          ...state,
          products: state.products.filter((prod) => prod.id !== action.payload.id),
          totalProducts: state.totalProducts - 1,
        }
      } else {
        return {
          ...state,
          products: state.products.map((prod) =>
            prod.id === action.payload.id ? { ...prod, quantity: prod.quantity - 1 } : prod
          ),
          totalProducts: state.totalProducts - 1,
        }
      }
    }
    case 'CLEAR_PRODUCTS': {
      return {
        products: [],
        totalProducts: 0,
      }
    }
  }
}

function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = React.useReducer(cartReducer, { products: [], totalProducts: 0 })
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

function useCartState() {
  const context = React.useContext(CartStateContext)
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider')
  }
  return context
}

function useCartDispatch() {
  const context = React.useContext(CartDispatchContext)
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCartState, useCartDispatch }
