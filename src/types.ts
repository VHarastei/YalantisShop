import { MultiValue } from 'react-select'

export interface IProduct {
  id: string
  isEditable: boolean
  name: string
  price: number
  origin: Origin
  createdAt: string
  updatedAt: string
}

export type Origin = 'europe' | 'usa' | 'africa' | 'asia'

export interface IProductWithQuantity extends IProduct {
  quantity: number
}

export interface IOrder {
  id: string
  pieces: IOrderPiece[]
  createdAt: string
}

export interface IOrders {
  items: IOrder[]
}

export interface IOrderPiece {
  id: string
  count: number
  product: IProduct
}

export interface IProductsWithPagination {
  items: IProduct[]
  totalItems: number
  page: number
  perPage: number
}

export interface IPagination {
  numberOfItems: number
  itemsPerPage: number
  currentPage: number
  numberOfButtons: number
}

export interface IProductsOrigins {
  items: {
    value: string
    displayName: string
  }[]
}

export type SelectOptions = MultiValue<{ value: string; label: string }>

export enum Status {
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}
