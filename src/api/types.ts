import { Origin } from 'types'

export type GetProductsPayload = {
  page?: number
  perPage?: number
  origins?: string
  minPrice?: number
  maxPrice?: number
  editable?: boolean
}

export type CreateProductPayload = {
  product: {
    name: string
    price: number
    origin: Origin
  }
}

export type UpdateProductPayload = {
  productId: string
  payload: CreateProductPayload
}

export type CreateOrderPayload = {
  order: {
    pieces: {
      productId: string
      count: number
    }[]
  }
}
